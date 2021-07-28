import { useState, React, useEffect } from "react";
import { Edit, Delete, Close, SearchRounded } from "@material-ui/icons";
import { TextField } from "@material-ui/core";
import axios from "axios";

let baseURL = "http://localhost:3001";

let TourCard = ({ props, styles, popup, deleteOne }) => {
  return (
    <div className={styles.adminTicketCard}>
      <div className={styles.textSide}>
        <p className={styles.cardTitle}>{props.title}</p>
        <p className={styles.cardDesc}>{props.desc}</p>
      </div>
      <div className={styles.cardIcons}>
        <Edit onClick={() => popup()} />
        <div style={{ height: "20px" }}></div>
        <Delete onClick={() => deleteOne()} />
      </div>
    </div>
  );
};

let api;
let myToken = "";

export default function ManageTickets({ styles }) {
  let objectTemp = {
    title: "",
    desc: "",
    price: 0,
    duration: 0,
    availability: 0,
  };

  let [state, setState] = useState({
    tickets: [],
    isNewRecord: false,
    edit: false,
    userSearch: "",
    searchedResult: [],
    presentEdit: { index: 0 },
    uploadedImg: null,
  });

  let refreshTickets = () => {
    api
      .get(`${baseURL}/tickets`)
      .then((res) => {
        setState({ ...state, edit: false, tickets: res.data.tickets });
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  };

  useEffect(async () => {
    api = axios.create({
      url: baseURL,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(window.localStorage.getItem("cyberTourAdmin")).token
        }`,
      },
    });
    myToken = `Bearer ${
      JSON.parse(window.localStorage.getItem("cyberTourAdmin")).token
    }`;

    refreshTickets();
  }, []);

  let filterList = (word) => {
    let output = [];
    state.tickets.forEach((e) => {
      if (
        word.trim().length != 0 &&
        e.title.toLowerCase().includes(word.toLowerCase())
      )
        output.push(e);
    });
    setState({ ...state, userSearch: word, searchedResult: output });
  };

  let mapped =
    state.searchedResult.length > 0 ? state.searchedResult : state.tickets;

  let handleChange = (e) => {
    setState({
      ...state,
      presentEdit: {
        ...state.presentEdit,
        [e.target.name]: e.target.value,
      },
    });
  };

  let popup = async (index) => {
    await setState({
      ...state,
      edit: true,
      isNewRecord: false,
      presentEdit: { index: index, ...state.tickets[index] },
    });
  };

  let deleteOne = (id, index) => {
    console.log(id);
    let confirmed = confirm("are you sure you want to delete Ticket?");
    if (confirmed) {
      api.post(`${baseURL}/tickets/delete`, { ticketId: id }, (res, err) => {
        if (res) console.log(res);
        else if (err) console.log(err);
      });
      refreshTickets();
    }
  };

  let save = async (isNewRecord) => {
    let myFormData = new FormData();
    Object.getOwnPropertyNames(state.presentEdit).forEach((each) => {
      myFormData.append(each, state.presentEdit[each]);
    });

    //to check if all fields were filled
    let fullness = 0;
    Object.getOwnPropertyNames(state.presentEdit).forEach((e) => {
      if (state.presentEdit[e] == "" && state.presentEdit[e] != 0)
        fullness += 1;
    });

    if (!Boolean(fullness)) {
      if (isNewRecord) {
        axios
          .post(`${baseURL}/tickets`, myFormData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: myToken,
            },
          })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        setState({
          ...state,
          tickets: [...state.tickets, state.presentEdit],
          presentEdit: {},
          edit: false,
          isNewRecord: false,
        });
      } else {
        await axios
          .patch(`${baseURL}/tickets`, myFormData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: myToken,
            },
          })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        await setState({
          ...state,
          presentEdit: {},
          edit: false,
          isNewRecord: false,
        });
        await refreshTickets();
      }
    } else {
      alert("Fill all fields Please");
    }
  };

  let imageUpload = (e) => {
    setState({
      ...state,
      uploadedImg: e.target.files[0],
      presentEdit: { ...state.presentEdit, imageUrl: e.target.files[0] },
    });
  };

  if (state.edit) {
    //editting on
    return (
      <div className={styles.editScreen}>
        <div className={styles.closeContain}>
          <Close
            onClick={() => {
              setState({ ...state, edit: false, presentEdit: {} });
            }}
          />
        </div>
        <div className={styles.inputDiv}>
          <div className={styles.imageUpload}>
            <img src={`${baseURL + state.presentEdit.imageUrl}`} />
            <p></p>
            <input type="file" onChange={(evt) => imageUpload(evt)} />
          </div>
          {Object.getOwnPropertyNames(objectTemp).map((each, index) => {
            return (
              <TextField
                className={styles.input}
                placeholder={each}
                variant="outlined"
                label={each}
                className={styles.editInput}
                name={each}
                value={state.presentEdit[each]}
                onChange={(e) => handleChange(e)}
                type={
                  each == "price" ||
                  each == "availability" ||
                  each == "duration"
                    ? "number"
                    : "text"
                }
              />
            );
          })}
          <button
            onClick={() => {
              save(state.isNewRecord);
            }}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
  //editting off
  else {
    return (
      <div className={styles.manageTicketsContainer}>
        <div className={styles.searchContain}>
          <button
            onClick={() =>
              setState({ ...state, edit: true, isNewRecord: true })
            }
            className={styles.addButton}
          >
            Add Ticket
          </button>
          <div className={styles.search}>
            <input
              value={state.userSearch}
              onChange={(e) => filterList(e.target.value)}
            />
            <SearchRounded className={styles.searchIcon} size="xl" />
          </div>
        </div>

        <div className={styles.manageTickets}>
          <div>
            {mapped.map((each, index) => (
              <TourCard
                key={index}
                styles={styles}
                props={each}
                popup={() => popup(index)}
                deleteOne={() => deleteOne(each._id, index)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
