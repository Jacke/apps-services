import React from "react";
import "whatwg-fetch";
import { render } from "react-dom";
import DataTable from "react-data-table-component";

// Docs: https://react-data-table-component.netlify.app/?path=/story/getting-started-intro--page
const columns = [
  {
    name: "Title",
    selector: (row) => row.fields.Name,
  },
  {
    name: "URL",
    selector: (row) => row.fields.URL,
  },
  {
    name: "Created At",
    selector: (row) => row.fields.Created,
  },
  {
    name: "Tags",
    selector: (row) => row.fields.tags || "",
  },
];

class App extends React.Component {
  state = {
    records: [],
  };

  async componentDidMount() {
    const resp = await fetch("/api", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const { records } = await resp.json();
    this.setState({ records });
  }

  render() {
    let { records } = this.state;
    return (
      <div className="App">
        {records.length ? <DataTable columns={columns} data={records} /> : ""}
      </div>
    );
  }
}

render(<App />, document.getElementById("apps-services"));
