const fs = require("fs");
const path = require("path");
const config = require("../data/constData");

function checkData(dataTable, data) {
  if (data == null || data == undefined || data.length == 0) {
    data = [];
    let row = {};
    for (let index = 0; index < dataTable.headTable.length; index++) {
      let header = dataTable.headTable.filter((item) => item.index == index);

      if (header != null && header != undefined && header.length == 1) {
        if (header[0].name === "no") {
          row["id"] = Date.now();
        } else {
          row[header[0].name] = null;
        }
      }
    }
    data.push(row);
    dataTable.bodyTable = data;
  } else dataTable.bodyTable = data;
  return dataTable;
}

exports.index = (req, res) => {
  // Sample data
  let dataTable = {
    isShowBoxSearch: true,
    headTable: [
      { index: 0, name: "no", type: "int", headerName: "STT" },
      {
        index: 1,
        name: "percentage",
        type: "string",
        headerName: "Percentage",
      },
      { index: 2, name: "stage", type: "string", headerName: "Stage" },
      {
        index: 3,
        name: "rcd_inf_date",
        type: "string",
        headerName: "Rcd Inf Date",
      },
      { index: 4, name: "customer", type: "string", headerName: "Customer" },
      { index: 5, name: "season", type: "string", headerName: "Season" },
      { index: 6, name: "job", type: "string", headerName: "Job" },
      { index: 7, name: "style", type: "string", headerName: "Style" },
      { index: 8, name: "sp", type: "string", headerName: "Sp" },
      { index: 9, name: "placement", type: "string", headerName: "Placement" },
      { index: 10, name: "link", type: "string", headerName: "Link" },
      { index: 11, name: "ink_type", type: "string", headerName: "Ink Type" },
      { index: 12, name: "aw_name", type: "string", headerName: "Aw Name" },
      {
        index: 13,
        name: "aw_picture",
        type: "string",
        headerName: "Aw Picture",
      },
      { index: 14, name: "aw_height", type: "string", headerName: "Aw Height" },
      { index: 15, name: "aw_weight", type: "string", headerName: "Aw Weight" },
      { index: 16, name: "cw", type: "string", headerName: "Cw" },
      {
        index: 17,
        name: "fabric_color_code",
        type: "string",
        headerName: "Fabric Color Code",
      },
      { index: 18, name: "1c", type: "string", headerName: "1C" },
      { index: 19, name: "2c", type: "string", headerName: "2C" },
      { index: 20, name: "3c", type: "string", headerName: "3C" },
      { index: 21, name: "4c", type: "string", headerName: "4C" },
      { index: 22, name: "5c", type: "string", headerName: "5C" },
      { index: 23, name: "6c", type: "string", headerName: "6C" },
      { index: 24, name: "fab_item", type: "string", headerName: "Fab Item" },
      {
        index: 25,
        name: "fab_received",
        type: "string",
        headerName: "Fab Received",
      },
      { index: 26, name: "screen_no", type: "string", headerName: "Screen No" },
      { index: 27, name: "notescr", type: "string", headerName: "Notescr" },
      {
        index: 28,
        name: "ink_preparation",
        type: "string",
        headerName: "Ink Preparation",
      },
      {
        index: 29,
        name: "screen_preparation",
        type: "string",
        headerName: "Screen Preparation",
      },
      { index: 30, name: "schedule1", type: "string", headerName: "Schedule1" },
      { index: 31, name: "1st_print", type: "string", headerName: "1St Print" },
      { index: 32, name: "ticket", type: "string", headerName: "Ticket" },
      { index: 33, name: "in-result", type: "string", headerName: "In-Result" },
      { index: 34, name: "schedule2", type: "string", headerName: "Schedule2" },
      { index: 35, name: "2nd_print", type: "string", headerName: "2Nd Print" },
      { index: 36, name: "ticket2", type: "string", headerName: "Ticket2" },
      {
        index: 37,
        name: "in-result2",
        type: "string",
        headerName: "In-Result2",
      },
      {
        index: 38,
        name: "lab_test_in",
        type: "string",
        headerName: "Lab Test In",
      },
      {
        index: 39,
        name: "lab_test_out",
        type: "string",
        headerName: "Lab Test Out",
      },
      { index: 40, name: "kq", type: "string", headerName: "Kq" },
      { index: 41, name: "schedule3", type: "string", headerName: "Schedule3" },
      {
        index: 42,
        name: "mass_print",
        type: "string",
        headerName: "Mass Print",
      },
      {
        index: 43,
        name: "sent_to_siv_date",
        type: "string",
        headerName: "Sent To Siv Date",
      },
      { index: 44, name: "nofsubmit", type: "string", headerName: "Nofsubmit" },
      { index: 45, name: "siv_r", type: "string", headerName: "Siv R" },
      {
        index: 46,
        name: "siv_approval",
        type: "string",
        headerName: "Siv Approval",
      },
      {
        index: 47,
        name: "rcd_sample",
        type: "string",
        headerName: "Rcd Sample",
      },
      {
        index: 48,
        name: "artwork_siv",
        type: "string",
        headerName: "Artwork Siv",
      },
      { index: 49, name: "remark", type: "string", headerName: "Remark" },
      {
        index: 50,
        name: "remark-siv",
        type: "string",
        headerName: "Remark-Siv",
      },
      { index: 51, name: "note", type: "string", headerName: "Note" },
      {
        index: 52,
        name: "ink_vender",
        type: "string",
        headerName: "Ink Vender",
      },
      { index: 53, name: "s11", type: "string", headerName: "S11" },
      { index: 54, name: "djob", type: "string", headerName: "Djob" },
      { index: 55, name: "ifp", type: "string", headerName: "Ifp" },
      {
        index: 56,
        name: "date_reason_of_late",
        type: "string",
        headerName: "Date Reason Of Late",
      },
      { index: 57, name: "unit", type: "string", headerName: "Unit" },
      {
        index: 58,
        name: "reason_of_late",
        type: "string",
        headerName: "Reason Of Late",
      },
    ],
    bodyTable: [],
    dataTableId: config.dataConfig.data_sample_dev.dataTableId,
    nameGetData: config.dataConfig.data_sample_dev.nameGetData,
  };
  try {
    // Path to the JSON file
    const filePath = path.join(
      __dirname,
      config.dataConfig.data_sample_dev.path_file_json
    );
    const data = fs.readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(data);
    dataTable = checkData(dataTable, jsonData);
  } catch (err) {
    dataTable = checkData(dataTable, null);
    console.error("Error parsing JSON:", err.message);
  }

  res.render("sampleDev", { title: "Sample Dev Page", dataTable: dataTable });
};
