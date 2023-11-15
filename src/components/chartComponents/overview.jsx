// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { useEffect, useState } from "react";

import Box from '@cloudscape-design/components/box';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';

// export interface ProductionOverviewProps {
//     metrics: { key: string; value: string }[];
// }

export default ({ data, loading, setLoading, header }) => {
    const [metrics, setMetrics] = useState([]);

    useEffect(() => {
        // Simulate data loading
        setMetrics(data)
        console.log(metrics);
        setTimeout(() => {
            setLoading(false); // Update loading state when data arrives
        }, 3000); // Adjust the delay as needed
    }, [data, loading]);

    
    return (
        <Container header={<Header variant="h2">{header}</Header>}>
            <ColumnLayout columns={metrics.length} variant="text-grid">
                {metrics.map(({ key, value }) => (
                    <Box key={key}>
                        <Box color="text-label" margin={{ bottom: 'xxxs' }}>
                            {key}
                        </Box>
                        <Box fontSize="heading-xl">{value}</Box>
                    </Box>
                ))}
            </ColumnLayout>
        </Container>
    );
}