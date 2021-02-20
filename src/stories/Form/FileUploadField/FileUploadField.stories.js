import React from 'react';

import * as R from "ramda";

import {DefaultFormFieldFactory, FileUploadField} from "@intellective/core";

export default {title: 'Examples/Form/Fields/FileUpload'};

export const UsingDropzone = () => {
	const CustomFileUploadField = (props) => {
		return (
			<FileUploadField {...props}
			                 dropZoneMessage={`Custom message for '${props.label}' field`}
			                 dropZoneDragActiveMessage="Drop these PDFs here"
			/>
		);
	};

	const isFileUploadField = R.anyPass([
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

	const DomainFormFieldFactory = R.cond([
		[isFileUploadField, R.always(CustomFileUploadField)],
		[R.T, DefaultFormFieldFactory]
	]);

	return (
		<CustomFileUploadField id="customFileUpload" label="Attachment" variant="dropzone"/>
	);
}

