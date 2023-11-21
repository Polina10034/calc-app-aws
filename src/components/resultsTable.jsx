import * as React from "react";
import { useState } from "react";
import Box from "@cloudscape-design/components/box";
import FileUpload from "@cloudscape-design/components/file-upload";
import FormField from "@cloudscape-design/components/form-field";
import Header from "@cloudscape-design/components/header";
import Form from "@cloudscape-design/components/form";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Container from "@cloudscape-design/components/container";
import Input from "@cloudscape-design/components/input";
import { fileService } from "../service/fileService";
import Table from "./tableComponents/table"
import Multiselect from "@cloudscape-design/components/multiselect";
import AnalysisOverview from "./chartComponents/overview";
import QSDashboards from "./chartComponents/QSDashboards";

export default () => {
  const [accountData, setAccountData] = useState([]);
  const [availble, setAvailble] = useState(false);
  const [accountId, setAccountId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [ metrics, setMetrics] = useState([]);
  const [selectedInstanceMetrics, setSelected] = useState([])
  const [selectedOptions, setSelectedOptions] = useState([
    {
      label: "us-east-1",
      value: "r2_new_pricing",
      description: "US East (N. virginia)"
    },
  ]);

  function findItemWithMaxCost(items) {
    if (items.length === 0) {
      return null; // Return null for an empty array
    }
  
    let maxCostItem = items[0]; // Assume the first item has the maximum cost
    let sumCost = 0;
    let instanceCount = 0;
    for (let i = 1; i < items.length; i++) {
      instanceCount++;
      if(items[i].term_type = "OnDemand"){
        sumCost += items[i].instance_type_monthly_cost;
        if (items[i].instance_type_monthly_cost > maxCostItem.instance_type_monthly_cost) {
          maxCostItem = items[i]; // Update maxCostItem if a higher cost is found
        }
      }
    }
    setMetrics([{key: 'Total Instances Spend', value: `$${(sumCost).toFixed(0)}`},
    {key:"Number of Instance Types", value: instanceCount},
    {key:"Most Active Instance", value: maxCostItem.case_product_instance_type},
    {key:"Total Usage", value: `${(maxCostItem.instance_type_monthly_usage).toFixed(0)} Hrs`},
    // {key: `In ${selectedOptions[0].description}`, value: `$${(maxCostItem[selectedOptions[0].value]).toFixed(2)}`}
  ])
    // return maxCostItem;
  }
  
  let handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      fileService.getPricingRsults(accountId, selectedOptions).then(res => {
        if (res) {
          console.log(res);
          setAccountData(res);
          setAvailble(true);
          setIsLoading(false);
          findItemWithMaxCost(res)
          // console.log(maxItem)
        } else {
          alert("Some error occured");
          console.log(res)
        }

      })

    } catch (err) {
      console.log(err);
    }
  };

   return (
    <SpaceBetween size={'l'}>
      <form onSubmit={handleSubmit}>
        <Form
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button formAction="none" variant="link">
                Cancel
              </Button>
              <Button variant="primary">Submit</Button>
            </SpaceBetween>
          }
          header={<Header variant="h1">Workload Analysis Results</Header>}
        >
          <Container
            header={
              <Header variant="h2">
                Compare Amazon EC2 instances workload pricing
              </Header>
            }
          >
            <SpaceBetween direction="vertical" size="l">
              <FormField label="AWS Account ID" >
                <Input
                  onChange={({ detail }) => setAccountId(detail.value)}
                  value={accountId}
                  placeholder="12345678910"
                />
              </FormField>
            </SpaceBetween>
            <FormField label="Select two AWS regions for comparison"  />

            <Multiselect
              selectedOptions={selectedOptions}
              onChange={({ detail }) =>
                setSelectedOptions(detail.selectedOptions)
              }
              options={[
                {
                  label: "us-west-1",
                  value: "new_pricing",
                  description: "US West (California)"
                },
                {
                  label: "us-west-2",
                  value: "r1_new_pricing",
                  description: "US West (Oregon)"
                },
                {
                  label: "us-east-1",
                  value: "r2_new_pricing",
                  description: "US East (N. virginia)"
                },
                {
                  label: "us-east-2",
                  value: "r3_new_pricing",
                  description: "US East (Ohio)"
                },
                {
                  label: "il-central-1",
                  value: "il-central-1",
                  disabled: true,
                  description: "Israel (Tel Aviv)"
                },
                {
                  label: "eu-west-1",
                  value: "r5_new_pricing",
                  description: "Europe (Ireland)"
                },
                {                   
                  label: "eu-central-1",
                  value: "r4_new_pricing",
                  description: "Europe (Frankfurt)" 
                },
                {
                  label: "eu-west-1",
                  value: "r6_new_pricing",
                  description: "Europe (London)"
                },
              ]}
              placeholder="Choose options"
            />
            
          </Container>
        </Form>
      </form>
      
      {isLoading ? <></> : <>
      <AnalysisOverview data={metrics} loading={isLoading} setLoading={setIsLoading} header={"Analysis Overview"}/>
      <Table data={accountData} availble={availble} loading={isLoading} setLoading={setIsLoading} selectedOptions={selectedOptions} setSelectedInstance={setSelected} />
      <AnalysisOverview data={selectedInstanceMetrics} loading={isLoading} setLoading={setIsLoading} header={"Analysis Insights"}/>
      <QSDashboards header={"QuickSight Dashboards"}/>
      </>}
      </SpaceBetween>
  );
}
