import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Template,
  TemplatePlaceholder,
  TemplateConnector
} from "@devexpress/dx-react-core";
import {
  PagingState,
  SearchState,
  SelectionState,
  IntegratedPaging,
  IntegratedSelection,
  IntegratedFiltering
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  Toolbar,
  SearchPanel,
  PagingPanel
} from "@devexpress/dx-react-grid-bootstrap4";

import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";

//import "./static/table.css";

const TableComponent = ({ ...restProps }) => (
  <Table.Table {...restProps} className="table-striped" />
);

//on table row click
const TableRow = ({ classes, row, ...restProps }) => (
  <Table.Row {...restProps} onClick={() => alert(JSON.stringify(row))} />
);

const GridUtils = props => {
  const { rows, columns } = props;
  const [pageSizes] = React.useState([50, 100, 500, 0]);

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
        <SearchPanel />
        <Template name="toolbarContent">
            <TemplateConnector>
              {({ totalCount }) => (
                <React.Fragment>
                  <div>Total Count: {totalCount} Messages</div>
                  <TemplatePlaceholder />
                </React.Fragment>
              )}
            </TemplateConnector>
          </Template>
      </Grid>
    </div>
  );
};

export default withRouter(GridUtils);
