let RecordCard = ({ styles, props }) => {
  if (props.length > 0) {
    return (
      <div>
        {props.map((eachDate, index) => {
          let getTotal = () => {
            let total = 0;
            eachDate.sales.forEach((each) => (total += Number(each.price)));
            return total;
          };
          return (
            <div key={index}>
              <h3>{eachDate.date}</h3>
              <span>
                {eachDate.sales.map((eachSalesProp, index2) => {
                  return (
                    <div className={styles.eachSale} key={index2}>
                      <p>{eachSalesProp.id}</p>
                      <p>{eachSalesProp.title}</p>
                      <p>{eachSalesProp.date}</p>
                      <p>{eachSalesProp.userId}</p>
                      <p>{eachSalesProp.price}</p>
                    </div>
                  );
                })}
              </span>
              <span className={styles.eachDateTotal}>
                <p>Total: {getTotal()}</p>
              </span>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <h2>waiting</h2>;
  }
};

let Sort = ({ styles, inputArray, searchKey }) => {
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let years = [];
  for (let i = 2010; i < 2022; i++) {
    let year = [];
    for (let j = 0; j < inputArray.length; j++) {
      if (i == Number(inputArray[j].date.slice(0, 4))) {
        year.push(inputArray[j]);
      }
    }
    if (year.length > 0) {
      years.push({ date: `${i}`, sales: year });
    }
  }

  if (searchKey == 0) {
    return <RecordCard styles={styles} props={years} />;
  }

  let months = [];
  for (let i = 0; i < years.length; i++) {
    //each month
    for (let j = 0; j < 12; j++) {
      let sales = [];
      //each item
      for (let k = 0; k < years[i].sales.length; k++) {
        if (j == Number(years[i].sales[k].date.slice(5, 7))) {
          sales.push(years[i].sales[k]);
        }
      }
      if (sales.length > 0) {
        months.push({
          count: sales.length,
          date: years[i].date + " " + monthNames[j - 1],
          sales: sales,
        });
      }
    }
  }
  if (months.length > 0 && searchKey == 1) {
    return <RecordCard styles={styles} props={months} />;
  }

  let weeks = [];
  months.forEach((eachMonth) => {
    let getEachWeek = (start, end, index) => {
      for (let i = start; i < end; i++) {
        let weekSales = [];
        eachMonth.sales.forEach((eachMonthSales) => {
          if (i == Number(eachMonthSales.date.slice(8, 10))) {
            weekSales.push(eachMonthSales);
          }
        });
        if (weekSales.length > 0 && weeks.length == 0) {
          weeks.push({
            date: eachMonth.date + ` week ${index + 1}`,
            sales: weekSales,
            count: weekSales.length,
          });
        } else if (
          weekSales.length > 0 &&
          weeks[weeks.length - 1].date != eachMonth.date + ` ${index}`
        ) {
          weeks.push({
            date: eachMonth.date + ` ${index}`,
            sales: weekSales,
            count: weekSales.length,
          });
        }
      }
    };
    [0, 1, 2, 3].forEach((eachWeek, index) => {
      getEachWeek(7 * eachWeek, 7 * eachWeek + 7, index);
    });
  });
  if (searchKey == 2) {
    return <RecordCard styles={styles} props={weeks} />;
  }

  let locations = [];
  let isIn = [];
  inputArray.forEach((each) => {
    if (locations.length == 0) {
      locations.push({ date: each.title, sales: [] });
      isIn.push(each.title);
    } else if (locations.length > 0) {
      if (isIn.includes(each.title) == false) {
        locations.push({ date: each.title, sales: [] });
        isIn.push(each.title);
      }
    }
  });

  inputArray.forEach((eachSale) => {
    locations.forEach((eachLocation) => {
      if (eachSale.title == eachLocation.date) {
        locations[locations.indexOf(eachLocation)].sales = [
          ...locations[locations.indexOf(eachLocation)].sales,
          eachSale,
        ];
      }
    });
  });
  if (searchKey == 3) {
    return <RecordCard styles={styles} props={locations}/>
  }
};

export default Sort;
