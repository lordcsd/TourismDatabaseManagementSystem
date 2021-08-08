import { useState, React, useEffect } from "react";
import { useRouter } from "next/router";
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
        <Edit onClick={() => popup(props._id)} />
        <div style={{ height: "20px" }}></div>
        <Delete onClick={() => deleteOne()} />
      </div>
    </div>
  );
};

let api;
let store;

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

  let router = useRouter();

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

  useEffect( () => {
    store = JSON.parse(window.localStorage.getItem("cyberTourAdmin"));
    api = axios.create({
      url: baseURL,
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
    });

    refreshTickets();
  }, []);
  // eslint-disable-line react-hooks/exhaustive-deps

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

  let popup = async (_id) => {
    let filtered = state.tickets.filter((e) => e._id == _id);
    await setState({
      ...state,
      edit: true,
      isNewRecord: false,
      presentEdit: { ...filtered[0] },
    });
  };

  let deleteOne = (id, index, title) => {
    console.log(id);
    let confirmed = confirm(`are you sure you want to delete ${title}?`);
    if (confirmed) {
      api
        .post(`${baseURL}/tickets/delete`, { ticketId: id })
        .then((res) => console.log(res))
        .catch((err) => {
          if (err.message.includes("401")) {
            router.push("/sessionExpired");
          }
        });
      refreshTickets();
    }
  };

  let save = async (isNewRecord) => {
    //to check if all fields were filled
    let fullness = 0;
    Object.getOwnPropertyNames(state.presentEdit).forEach((e) => {
      if (state.presentEdit[e] == "" && state.presentEdit[e] != 0)
        fullness += 1;
    });

    if (!Boolean(fullness)) {
      if (isNewRecord) {
        axios
          .post(`${baseURL}/tickets`, state.presentEdit, {
            headers: {
              Authorization: "Bearer " + store.token,
            },
          })
          .then((res) => console.log(res))
          .catch((err) => {
            if (err.message.includes("401")) {
              router.push("/sessionExpired");
            }
          });
        setState({
          ...state,
          tickets: [...state.tickets, state.presentEdit],
          presentEdit: {},
          edit: false,
          isNewRecord: false,
        });
      } else {
        await axios
          .patch(`${baseURL}/tickets`, state.presentEdit, {
            headers: {
              Authorization: "Bearer " + store.token,
            },
          })
          .then((res) => console.log(res))
          .catch((err) => {
            if (err.message.includes("401")) {
              router.push("/sessionExpired");
            }
          });
        await setState({
          ...state,
          presentEdit: {},
          edit: false,
          isNewRecord: false,
        });
        refreshTickets();
      }
    } else {
      alert("Fill all fields Please");
    }
  };

  let imageUpload = async (e) => {
    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    };

    await convertToBase64(e.target.files[0])
      .then((res) => {
        setState({
          ...state,
          presentEdit: { ...state.presentEdit, imageUrl: res },
        });
      })
      .catch((err) => Console.log(err));
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
            <div
              style={{
                height: "200px",
                background: `url(${state.presentEdit.imageUrl})`,
                backgroundSize: "auto 200px",
                backgroundRepeat:"no-repeat"
              }}
            ></div>
            <p></p>
            <input
              type="file"
              onChange={(evt) => imageUpload(evt)}
              accept=".jpeg, .png, .jpg"
            />
          </div>
          {Object.getOwnPropertyNames(objectTemp).map((each, index) => {
            return (
              <TextField
                placeholder={each}
                variant="outlined"
                label={each}
                className={styles.editInput}
                name={each}
                value={state.presentEdit[each]}
                key={index}
                onChange={(e) => handleChange(e)}
                size="small"
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
                popup={popup}
                deleteOne={() => deleteOne(each._id, index, each.title)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
