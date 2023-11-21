// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { useEffect, useState } from "react";

import Box from '@cloudscape-design/components/box';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';

export default ({ header }) => {

    return (
        <Container header={<Header variant="h2">{header}</Header>}>
            <Box >
            <iframe width="680" height="450" src="https://us-east-1.quicksight.aws.amazon.com/sn/embed/share/accounts/237893317737/dashboards/cost_intelligence_dashboard/sheets/29840804-5739-44bd-8f38-575deae1dd66/visuals/37302a0f-114b-4f7b-acd9-1f697040f004?directory_alias=polinapo-demo"></iframe>
          </Box>
        </Container>
    );
}