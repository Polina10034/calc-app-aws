import React, { useState, useEffect } from "react";
import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import TextFilter from "@cloudscape-design/components/text-filter";
import Header from "@cloudscape-design/components/header";
import Pagination from "@cloudscape-design/components/pagination";
import CollectionPreferences from "@cloudscape-design/components/collection-preferences";

export default ({ data, loading, setLoading, selectedOptions, setSelectedInstance }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [changeType, setChangeType] = useState('');
  
  const calcPrecentage = (a,b) => {
    if (a > 0 && b >0){
      let diff = a - b;
      let percentage = (Math.abs(diff) / Math.max(Math.abs(a), Math.abs(b))) * 100;
      console.log(percentage)
      if (diff > 0) {
        return "+ " + percentage.toFixed(2) + "%";
      } else if (diff < 0) {
        return "- " + percentage.toFixed(2) + "%";
      } else if (diff == 0) {
        return "0%";
      } 
    }
    }
    

  useEffect(() => {
    // Simulate data loading
    setSelectedRegions(selectedOptions)
    setTimeout(() => {
      setItems(data); // Update data state when data arrives
      setLoading(false); // Update loading state when data arrives
    }, 3000); // Adjust the delay as needed
  }, [data, loading]);

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    var metrics = [{key:"Instance Type", value: item.case_product_instance_type},
    {key: `Pricing in ${selectedRegions[0].description} is $${(item[selectedRegions[0].value]).toFixed(2)}`, value: `${calcPrecentage(item[selectedRegions[0].value], item.instance_type_monthly_cost)}`},
    {key: `Pricing in ${selectedRegions[1].description} is $${(item[selectedRegions[1].value]).toFixed(2)}`, value: `${calcPrecentage(item[selectedRegions[1].value], item.instance_type_monthly_cost)}`},
    // {key: 'Insights' , value:  `${selectedRegions[0].description} will be ${calcPrecentage(item[selectedRegions[0].value], item.instance_type_monthly_cost)} 
    // and ${selectedRegions[1].description} will be ${calcPrecentage(item[selectedRegions[1].value], item.instance_type_monthly_cost)}`}
  ]
    setSelectedInstance(metrics);
  };

  return (
    <Table
      onSelectionChange={({ detail }) => {
        if (detail.selectedItems.length > 0) {
          handleItemSelect(detail.selectedItems[0]);
        } else {
          handleItemSelect(null);
        }
      }}
      selectedItems={selectedItem ? [selectedItem] : []}
      ariaLabels={{
        selectionGroupLabel: "Item selection",
        allItemsSelectionLabel: "",
        itemSelectionLabel: (selectedItem) => selectedItem.id,
      }}
      columnDefinitions={[
        {
          id: "instance",
          header: "Instance type",
          cell: (item) => item.case_product_instance_type,
          sortingField: "instance",
          isRowHeader: true
        },
        {
            id: "instance_region",
            header: "Instance Region",
            cell: (item) => item.cur_product_region
        },
        {
          id: "term_type",
          header: "Pricing term",
          cell: (item) => item.pricing_term
        },
        {
          id: "total_usage",
          header: "Total usage (Hrs)",
          cell: (item) => item.instance_type_monthly_usage,
        },
        {
          id: "monthly_Cost",
          header: "Monthly cost",
          cell: (item) => item.instance_type_monthly_cost
        },
        {
            id: "currency",
            header: "Currency",
            cell: (item) => item.currency === null ? "-" : item.currency
        },
        {
          id: "region1",
          header: "Alternative Region #1",
          cell: (item) => {
            if (item.pricing_term === "Spot")
              return "Spot pricing is not available"
            else if(item.pricing_term == "OnDemand")
              return `$${(item[selectedRegions[0].value]).toFixed(4)} total estimated cost in ${selectedRegions[0].description} `
          }
        },
        {
          id: "region2",
          header: "Alternative Region #2",
          cell: (item, index) => {
            if (item.pricing_term === "Spot")
              return "Spot pricing is not available"
            return `$${(item[selectedRegions[1].value]).toFixed(4)} total estimated cost in ${selectedRegions[1].description} `
          }
        },
        {
          id: "operating_system",
          header: "OS",
          cell: (item) => item.operating_system
        }
      ]}
      isItemDisabled={item =>
        item.pricing_term === "Spot"
      }
      items={items}
      loading={loading}
      loadingText="Loading resources"
      selectionType="single" // Allow single item selection
      trackBy="id" // Use a unique identifier for tracking selected items
      empty={
        <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>Enter AWS account ID to see results</b>
          </SpaceBetween>
        </Box>
      }
      filter={
        <TextFilter filteringPlaceholder="Find resources" filteringText="" />
      }
      header={
        <Header
          counter={
            selectedItem ? `(${selectedItem.id})` : ""
          }
        >
          Amazon EC2 instances regional pricing
        </Header>
      }
      pagination={<Pagination currentPageIndex={1} pagesCount={2} />}
      preferences={
        <CollectionPreferences
          title="Preferences"
          confirmLabel="Confirm"
          cancelLabel="Cancel"
          preferences={{
            pageSize: 10,
            contentDisplay: [
              { id: "instance", visible: true },
              { id: "instance_region", visible: true },
              { id: "total_usage", visible: true },
              { id: "monthly_Cost", visible: true },
              { id: "currency", visible: true },
              { id: "region", visible: true },
              { id: "region_pricing", visible: true },
              { id: "term_type", visible: true },
              { id: "operating_system", visible: true },
            ],
          }}
          pageSizePreference={{
            title: "Page size",
            options: [
              { value: 10, label: "10 resources" },
              { value: 20, label: "20 resources" },
            ],
          }}
          wrapLinesPreference={{}}
          stripedRowsPreference={{}}
          contentDensityPreference={{}}
          contentDisplayPreference={{
            options: [
              { id: "instance", label: "Instance type", alwaysVisible: true },
              { id: "instance_region", label: "Instance region" },
              { id: "total_usage", label: "Total usage (Hrs)" },
              { id: "monthly_Cost", label: "Monthly cost" },
              { id: "currency", label: "Currency" },
              { id: "region", label: "Region" },
              { id: "region_pricing", label: "Potential pricing" },
              { id: "term_type", label: "Pricing term" },
              { id: "operating_system", label: "OS" },
            ],
          }}
          stickyColumnsPreference={{
            firstColumns: {
              title: "Stick first column(s)",
              description:
                "Keep the first column(s) visible while horizontally scrolling the table content.",
              options: [
                { label: "None", value: 0 },
                { label: "First column", value: 1 },
                { label: "First two columns", value: 2 },
              ],
            },
            lastColumns: {
              title: "Stick last column",
              description:
                "Keep the last column visible while horizontally scrolling the table content.",
              options: [
                { label: "None", value: 0 },
                { label: "Last column", value: 1 },
              ],
            },
          }}
        />
      }
    />
  );
};

// import React, { useState, useEffect } from "react";
// import Table from "@cloudscape-design/components/table";
// import Box from "@cloudscape-design/components/box";
// import SpaceBetween from "@cloudscape-design/components/space-between";
// import TextFilter from "@cloudscape-design/components/text-filter";
// import Header from "@cloudscape-design/components/header";
// import Pagination from "@cloudscape-design/components/pagination";
// import CollectionPreferences from "@cloudscape-design/components/collection-preferences";

// export default ({ data, loading, setLoading }) => {
//   const [selectedItems, setSelectedItems] = useState([]);
// //   const [loading, setLoading] = useState(true);
//   const [items, setItems] = useState([]);
//   console.log(data);

//   useEffect(() => {
//     // Simulate data loading
//     setTimeout(() => {
//       setItems(data); // Update data state when data arrives
//       setLoading(false); // Update loading state when data arrives
//     }, 2000); // Adjust the delay as needed
//   }, [data, loading]);

//   return (
//     <Table
//       onSelectionChange={({ detail }) => {
//         console.log(detail)
//         setSelectedItems(detail.selectedItems)}}
//       selectedItems={selectedItems}
//       ariaLabels={{
//         selectionGroupLabel: "Items selection",
//         allItemsSelectionLabel: selectedItems =>
//           `${selectedItems.length} ${
//             selectedItems.length === 1 ? "item" : "items"
//           } selected`,
//         itemSelectionLabel: (selectedItems, item) => item.sku,
//       }}
//       columnDefinitions={[
//                 {
//                   id: "instance",
//                   header: "Instance type",
//                   cell: item =>item.case_product_instance_type,
//                   sortingField: "instance",
//                   isRowHeader: true
//                 },
//                 {
//                   id: "total_usage",
//                   header: "Total usage (Hrs)",
//                   cell: item => item.instance_type_monthly_usage,
//                 //   sortingField: "alt"
//                 },
//                 {
//                   id: "monthly_Cost",
//                   header: "Monthly cost",
//                   cell: item => item.instance_type_monthly_cost
//                 },
//                 {
//                   id: "region",
//                   header: "Region",
//                   cell: item => item.location
//                 },
//                 {
//                     id: "region_pricing",
//                     header: "Potential pricing",
//                     cell: item => item.new_pricing
//                   },
//                   {
//                     id: "currency",
//                     header: "Currency",
//                     cell: item => item.currency
//                   },
//                   {
//                     id: "term_type",
//                     header: "Term type",
//                     cell: item => item.term_type
//                   },
//                   {
//                     id: "operating_system",
//                     header: "OS",
//                     cell: item => item.operating_system
//                   }
//               ]}
//       items={items}
//       loading={loading}
//       loadingText="Loading resources"
//       selectionType="multi"
//       trackBy="name"
//       empty={
//         <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
//           <SpaceBetween size="m">
//             <b>Enter AWS account ID to see results</b>
//           </SpaceBetween>
//         </Box>
//       }
//       filter={
//         <TextFilter filteringPlaceholder="Find resources" filteringText="" />
//       }
//       header={
//         <Header
//           counter={
//             selectedItems.length
//               ? `(${selectedItems.length}/10)`
//               : "(0/10)"
//           }
//         >
//           Amazon EC2 instances regional pricing
//         </Header>
//       }
//       pagination={<Pagination currentPageIndex={1} pagesCount={2} />}
//       preferences={
//         <CollectionPreferences
//           title="Preferences"
//           confirmLabel="Confirm"
//           cancelLabel="Cancel"
//           preferences={{
//             pageSize: 10,
//             contentDisplay: [
//               { id: "instance", visible: true },
//               { id: "total_usage", visible: true },
//               { id: "monthly_Cost", visible: true },
//               { id: "region", visible: true },
//               { id: "region_pricing", visible: true },
//               { id: "currency", visible: true },
//               { id: "term_type", visible: true },
//               { id: "operating_system", visible: true },
//             ],
//           }}
//           pageSizePreference={{
//             title: "Page size",
//             options: [
//               { value: 10, label: "10 resources" },
//               { value: 20, label: "20 resources" },
//             ],
//           }}
//           wrapLinesPreference={{}}
//           stripedRowsPreference={{}}
//           contentDensityPreference={{}}
//           contentDisplayPreference={{
//             options: [
//               { id: "instance", label: "Instance type", alwaysVisible: true },
//               { id: "total_usage", label: "Total usage (Hrs)" },
//               { id: "monthly_Cost", label: "Monthly cost" },
//               { id: "region", label: "Region" },
//               { id: "region_pricing", label: "Potential pricing" },
//               { id: "currency", label: "Currency" },
//               { id: "term_type", label: "Term type" },
//               { id: "operating_system", label: "OS" },
//             ],
//           }}
//           stickyColumnsPreference={{
//             firstColumns: {
//               title: "Stick first column(s)",
//               description:
//                 "Keep the first column(s) visible while horizontally scrolling the table content.",
//               options: [
//                 { label: "None", value: 0 },
//                 { label: "First column", value: 1 },
//                 { label: "First two columns", value: 2 },
//               ],
//             },
//             lastColumns: {
//               title: "Stick last column",
//               description:
//                 "Keep the last column visible while horizontally scrolling the table content.",
//               options: [
//                 { label: "None", value: 0 },
//                 { label: "Last column", value: 1 },
//               ],
//             },
//           }}
//         />
//       }
//     />
//   );
// };

// // import * as React from "react";
// // import { useState, useEffect } from "react";
// // import Table from "@cloudscape-design/components/table";
// // import Box from "@cloudscape-design/components/box";
// // import SpaceBetween from "@cloudscape-design/components/space-between";
// // import Button from "@cloudscape-design/components/button";
// // import TextFilter from "@cloudscape-design/components/text-filter";
// // import Header from "@cloudscape-design/components/header";
// // import Pagination from "@cloudscape-design/components/pagination";
// // import CollectionPreferences from "@cloudscape-design/components/collection-preferences";
// // import Link from "@cloudscape-design/components/link";


// // export default ({data}) => {
// //   const [
// //     selectedItems,
// //     setSelectedItems
// //   ] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [items, setItems] = useState([]);
// //   console.log(data)

// //   useEffect(() => {
// //     setItems(data); // Update data state when data arrives
  
// //     // Simulate data loading
// //     setTimeout(() => {
// //       setLoading(false); // Update loading state when data arrives
// //     }, 2000); // Adjust the delay as needed
// //   }, []);

  
// //   return (
// //     <Table
// //       onSelectionChange={({ detail }) =>
// //         setSelectedItems(detail.selectedItems)
// //       }
// //       selectedItems={selectedItems}
// //       ariaLabels={{
// //         selectionGroupLabel: "Items selection",
// //         allItemsSelectionLabel: ({ selectedItems }) =>
// //           `${selectedItems.length} ${
// //             selectedItems.length === 1 ? "item" : "items"
// //           } selected`,
// //         itemSelectionLabel: ({ selectedItems }, item) =>
// //           item.name
// //       }}
// //       columnDefinitions={[
// //         {
// //           id: "instance",
// //           header: "Instance type",
// //         //   cell: item => <Link href="#">{item.name}</Link>,
// //           sortingField: "instance",
// //           isRowHeader: true
// //         },
// //         {
// //           id: "total_usage",
// //           header: "Total usage (Hrs)",
// //           cell: item => item.instance_type_monthly_usage,
// //         //   sortingField: "alt"
// //         },
// //         {
// //           id: "monthly_Cost",
// //           header: "Monthly cost",
// //           cell: item => item.instance_type_monthly_cost
// //         },
// //         {
// //           id: "region",
// //           header: "Region",
// //           cell: item => item.location
// //         },
// //         {
// //             id: "region_pricing",
// //             header: "Potential pricing",
// //             cell: item => item.new_pricing
// //           },
// //           {
// //             id: "currency",
// //             header: "Currency",
// //             cell: item => item.currency
// //           },
// //           {
// //             id: "term_type",
// //             header: "Term type",
// //             cell: item => item.term_type
// //           },
// //           {
// //             id: "operating_system",
// //             header: "OS",
// //             cell: item => item.operating_system
// //           }
// //       ]}
// //       columnDisplay={[
// //         { id: "variable", visible: true },
// //         { id: "value", visible: true },
// //         { id: "type", visible: true },
// //         { id: "description", visible: true }
// //       ]}
// //       items={items}
    
// //       loading={loading}
// //       loadingText="Loading resources"
// //       selectionType="multi"
// //       trackBy="name"
// //       empty={
// //         <Box
// //           margin={{ vertical: "xs" }}
// //           textAlign="center"
// //           color="inherit"
// //         >
// //           <SpaceBetween size="m">
// //             <b>Enter AWS account ID to see results</b>
// //             {/* <Button>Create resource</Button> */}
// //           </SpaceBetween>
// //         </Box>
// //       }
// //       filter={
// //         <TextFilter
// //           filteringPlaceholder="Find resources"
// //           filteringText=""
// //         />
// //       }
// //       header={
// //         <Header
// //           counter={
// //             selectedItems.length
// //               ? "(" + selectedItems.length + "/" + ")"
// //               : "(0)"
// //           }
// //         >
// //           Table with common features
// //         </Header>
// //       }
// //       pagination={
// //         <Pagination currentPageIndex={1} pagesCount={2} />
// //       }
// //       preferences={
// //         <CollectionPreferences
// //           title="Preferences"
// //           confirmLabel="Confirm"
// //           cancelLabel="Cancel"
// //           preferences={{
// //             pageSize: 10,
// //             contentDisplay: [
// //               { id: "variable", visible: true },
// //               { id: "value", visible: true },
// //               { id: "type", visible: true },
// //               { id: "description", visible: true }
// //             ]
// //           }}
// //           pageSizePreference={{
// //             title: "Page size",
// //             options: [
// //               { value: 10, label: "10 resources" },
// //               { value: 20, label: "20 resources" }
// //             ]
// //           }}
// //           wrapLinesPreference={{}}
// //           stripedRowsPreference={{}}
// //           contentDensityPreference={{}}
// //           contentDisplayPreference={{
// //             options: [
// //               {
// //                 id: "variable",
// //                 label: "Variable name",
// //                 alwaysVisible: true
// //               },
// //               { id: "value", label: "Text value" },
// //               { id: "type", label: "Type" },
// //               { id: "description", label: "Description" }
// //             ]
// //           }}
// //           stickyColumnsPreference={{
// //             firstColumns: {
// //               title: "Stick first column(s)",
// //               description:
// //                 "Keep the first column(s) visible while horizontally scrolling the table content.",
// //               options: [
// //                 { label: "None", value: 0 },
// //                 { label: "First column", value: 1 },
// //                 { label: "First two columns", value: 2 }
// //               ]
// //             },
// //             lastColumns: {
// //               title: "Stick last column",
// //               description:
// //                 "Keep the last column visible while horizontally scrolling the table content.",
// //               options: [
// //                 { label: "None", value: 0 },
// //                 { label: "Last column", value: 1 }
// //               ]
// //             }
// //           }}
// //         />
// //       }
// //     />
// //   );
// // }