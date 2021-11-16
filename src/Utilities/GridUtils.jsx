import React, { useState, useRef, useCallback } from "react";
import { withRouter } from "react-router-dom";
import {
  Template,
  TemplatePlaceholder,
  TemplateConnector,
} from "@devexpress/dx-react-core";
import {
  PagingState,
  SearchState,
  SelectionState,
  IntegratedPaging,
  IntegratedSelection,
  IntegratedFiltering,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  Toolbar,
  SearchPanel,
  PagingPanel,
  ExportPanel,
} from "@devexpress/dx-react-grid-bootstrap4";
import { GridExporter } from "@devexpress/dx-react-grid-export";
import saveAs from "file-saver";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";

//import "./static/table.css";



const onSave = (workbook) => {
  //  use as simple as
  let todayDate = new Date().toJSON().slice(0, 10).replace(/-/g, "/");

  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(
      new Blob([buffer], { type: "application/octet-stream" }),
      `Wittyflow-Export-${todayDate}.xlsx`
    );
  });
};

const GridUtils = (props) => {
  const { rows, columns } = props;
  const [pageSizes] = React.useState([50, 100, 500, 0]);

  const exporterRef = useRef(null);
  const startExport = useCallback(() => {
    exporterRef.current.exportGrid();
  }, [exporterRef]);

  const [selection, setSelection] = React.useState([]);

  return (
    <div className="">
      <Grid rows={rows || []} columns={columns || []}>
        <PagingState />
        <SearchState defaultValue="" />
        <SelectionState
          selection={selection}
          onSelectionChange={setSelection}
        />

        <IntegratedPaging />
        <IntegratedSelection />
        <IntegratedFiltering />
        <PagingPanel pageSizes={pageSizes} />
        <Table
          cellComponent={props.cellComponent} //getting props here didn't work
          tableComponent={props.tableComponent}
          rowComponent={props.rowComponent}
        />
        <TableHeaderRow />
        <Toolbar />
        <ExportPanel startExport={startExport} />
        <SearchPanel />
        <Template name="toolbarContent">
          <TemplateConnector>
            {({ totalCount }) => (
              <React.Fragment>
                <div>Total Count: {totalCount} Records</div>
                <TemplatePlaceholder />
              </React.Fragment>
            )}
          </TemplateConnector>
        </Template>
      </Grid>
      <GridExporter
        ref={exporterRef}
        rows={rows}
        columns={columns}
        selection={selection}
        onSave={onSave}
      />
    </div>
  );
};

export default withRouter(GridUtils);
