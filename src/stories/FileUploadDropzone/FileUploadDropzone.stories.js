import React from 'react';

import * as R from "ramda";

import {DefaultFormFieldFactory, FileUploadField} from "@intellective/core";

import Page from "../../components/Page/Page";

export default {title: 'Examples/FileUploadDropZone'};

const CustomFileUploadDropzone = (props) => {
    return <FileUploadField {...props}
                            dropZoneMessage={`Custom message for '${props.label}' field`}
                            dropZoneDragActiveMessage="Drop these PDFs here"
    />;
};

const isFileDropzone = R.anyPass([
    R.allPass([
        R.propEq("type", "string"),
        R.anyPass([
            R.propEq("ui", "filedroparea"),
            R.propEq("ui", "filedropzone")
        ])
    ]),
    R.allPass([
        R.propEq("type", "file"),
        R.anyPass([
            R.propEq("variant", "droparea")
        ])
    ]),
    R.propEq('type', 'filedroparea'),
    R.propEq('type', 'filedropzone'),
]);

const DomainFieldMapper = R.cond([
    [isFileDropzone, R.always(CustomFileUploadDropzone)],
]);

const DomainFormFieldFactory = (props) => DomainFieldMapper(props) || DefaultFormFieldFactory(props)

export const UsingFileUploadDropzone = () => {
    return <Page href="/api/1.0.0/config/perspectives/search/dashboards/page1"
                 FormFieldFactory={DomainFormFieldFactory}/>;
}

