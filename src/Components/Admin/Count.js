import React, { Component } from "react";
import ActionHeader from "terra-action-header/lib/ActionHeader";
import Table from "terra-table";


export default class Goals extends Component {
  render() {
    return (
      <div>
        <br />
        <ActionHeader
          title={
            <div>
              <h6
                style={{
                  textAlign: "left",
                  fontSize: "12px",
                  marginTop: "1px",
                  marginBottom: "-1%"
                }}>
                Summary
              </h6>

              <Table isStriped={false} style={{ marginBottom: "-1%" }}>
                <Table.Rows
                  style={{ border: "2px solid #f4f4f4", marginBottom: "-1%" }}
                >
                  <Table.Row
                    key="PERSON_0"
                    style={{
                      borderBottom: "1px solid #f4f4f4"
                    }}
                  >
                    <Table.Cell
                      content="36"
                      key="col1"
                      style={{
                        textAlign: "center",
                        fontSize: "30px",
                        fontWeight: "bold"
                      }}
                    />
                    <Table.Cell
                      content="24"
                      key="col2"
                      style={{
                        textAlign: "center",
                        fontSize: "30px",
                        fontWeight: "bold"
                      }}
                    />
                    <Table.Cell
                      content="8"
                      key="col4"
                      style={{
                        textAlign: "center",
                        fontSize: "30px",
                        fontWeight: "bold"
                      }}
                    />
                    <Table.Cell
                      content="163"
                      key="col5"
                      style={{
                        textAlign: "center",
                        fontSize: "30px",
                        fontWeight: "bold"
                      }}
                    />
                  </Table.Row>
                  <Table.Row key="PERSON_1" style={{ marginTop: "-1%" }}>
                    <Table.Cell
                      content="Total Active Mentees"
                      key="liveMentees"
                      style={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: "bold",
                        paddingBottom: "0em"
                      }}
                    />
                    <Table.Cell
                      content="Total Active Mentors"
                      key="totalMentees"
                      style={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: "bold"
                      }}
                    />
                    <Table.Cell
                      content="Total Active Batches"
                      key="totalGoalsCreated"
                      style={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: "bold"
                      }}
                    />
                    <Table.Cell
                      content="Total Batches"
                      key="totalBATCHES"
                      style={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: "bold"
                      }}
                    />
                  </Table.Row>
                </Table.Rows>
              </Table>
            </div>
          }
        />
      </div>
    );
  }
}
