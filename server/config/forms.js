module.exports = {
    "application_form": {
        "formConfigurationId": 1000,
        "formId": 1000,
        "configuration": {
            "title": "Permit Application for Waste Transportation",
            "metadata": {
                "docType": "LicensingPermitting",
                "path": "/Application",
                "cromerrRequired": false,
                "fields": [
                    {
                        "id": "strStatutoryProgram"
                    },
                    {
                        "id": "strStatepertainingto",
                        "default": "CT"
                    },
                    {
                        "id": "strTownPertainingTo",
                        "alias": "CityTown"
                    },
                    {
                        "id": "strStreetAddress",
                        "alias": "Street"
                    },
                    {
                        "id": "strFileType",
                        "default": "Written Text"
                    },
                    {
                        "id": "EFILE_SubmissionType",
                        "default": "Portal"
                    },
                    {
                        "id": "strRecordsRetentionStatus",
                        "default": "Pending"
                    },
                    {
                        "id": "strRecordRetentionSeriesNumber",
                        "default": "TBD"
                    },
                    {
                        "id": "Public",
                        "default": true
                    },
                    {
                        "id": "EFILE_ClientName"
                    },
                    {
                        "id": "strLAndPDocType",
                        "default": "Application Submittal"
                    },
                    {
                        "id": "LPDocStatus",
                        "default": "Pending/Current"
                    }
                ]
            },
            "fields": [],
            "sections": [
                {
                    "title": "Part I: Application Type and Description",
                    "expanded": false,
                    "fields": [
                        {
                            "name": "applicationType",
                            "label": "This application is for?",
                            "dataType": "choices",
                            "inline": true,
                            "required": true,
                            "options": [
                                {
                                    "name": "A New Permit",
                                    "value": "newPermit"
                                },
                                {
                                    "name": "A Renewel of an existing permit",
                                    "value": "existingPermitRenewel"
                                }
                            ]
                        },
                        {
                            "name": "existingTranporterPermit#",
                            "label": "Existing transporter permit#",
                            "dataType": "string",
                            "required": true,
                            "hiddenCondition": "applicationType!=existingPermitRenewel"
                        },
                        {
                            "name": "applicationTypeNotice",
                            "defaultValue": "Please Provide the following (if applicable):",
                            "dataType": "rtftext",
                            "required": true,
                            "fullWidth": true
                        },
                        {
                            "name": "epaIDnum",
                            "label": "EPA ID number",
                            "required": true,
                            "dataType": "int"
                        },
                        {
                            "name": "usdotnum",
                            "label": "U.S. DOT #",
                            "required": true,
                            "dataType": "int"
                        }
                    ]
                },
                {
                    "title": "Part II: Permit Type and Fee Information",
                    "expanded": false,
                    "fields": [
                        {
                            "name": "Permit Type",
                            "label": "Permit Type (Select from A and B OR C)",
                            "dataType": "choices",
                            "inline": true,
                            "ui": "rtf",
                            "required": true,
                            "options": [
                                {
                                    "name": "[{\"children\": [{\"text\":\"A Hazardous Waste Transporter (RCRA and non-RCRA)\\n \", \"bold\":true},{\"text\": \"(If applying for a Spill Clean-Up Contractor then only select (i))\"}]}]",
                                    "value": "HazardousWasteTransporter"
                                },
                                {
                                    "name": "[{\"children\": [{\"text\":\"C. Biomedical Waste Transporter $1,750(two-year permit)\\n \", \"bold\":true},{\"text\":\" (Applicants for Biomedical Waste Transporter cannot use one application form for additional waste transporter permits- must use separate application forms.)\"}]}]",
                                    "value": "BiomedicalWasteTransporter"
                                }
                            ]
                        },
                        {
                            "name": "hazardousWasteTransporterPricing",
                            "label": "Hazardous Waste Transporter Pricing",
                            "dataType": "choices",
                            "inline": true,
                            "required": true,
                            "hiddenCondition": "Permit Type!=HazardousWasteTransporter",
                            "options": [
                                {
                                    "name": "(i) $940.00 (one-year permit)",
                                    "value": "oneyear"
                                },
                                {
                                    "name": "(ii) $1,880.00 (two-year permit)",
                                    "value": "twoyear"
                                },
                                {
                                    "name": "(iii) $2,820.00 (three-year permit)",
                                    "value": "threeyear"
                                },
                                {
                                    "name": "(iv) $3,760.00 (four-year permit)",
                                    "value": "fouryear"
                                }
                            ]
                        },
                        {
                            "name": "optionB",
                            "label": "[{\"children\": [{\"text\":\"B. Spill Clean-Up Contractor $940(one-year permit)\\n \", \"bold\":true},{\"text\":\"(Applicants for a Spill Clean-Up Contractor must also apply for no more than a one year Hazardous Waste Transporter Permit - option (i) from section A of Part II of this form.)\"}]}]",
                            "ui": "rtflabel",
                            "dataType": "checkbox",
                            "hiddenCondition": "hazardousWasteTransporterPricing!=oneyear,Permit Type!=HazardousWasteTransporter"
                        },
                        {
                            "name": "PartIINotice2",
                            "defaultValue": "The above fees are to be submitted for each permit that you are applying for. The application will not be processed without the fee. The fee shall be non-refundable and shall be paid by check or money order to the Department of Energy and Environmental Protection.",
                            "dataType": "rtftext",
                            "fullWidth": true
                        }
                    ]
                },
                {
                    "title": "Part III: Application Information",
                    "expanded": false,
                    "fields": [
                        {
                            "name": "applicationInformationNotice",
                            "defaultValue": "[{\"children\": [{\"text\": \"If an applicant is a corporation, limited liability company, limited partnership, limited liability partnership, or a statutory trust, it must be registered with the Secretary of State. If applicable, the applicant’s name shall be stated exactly as it is registered with the Secretary of State. Please note, for those entities registered with the Secretary of State, the registered name will be the name used by DEEP. This information can be accessed at the Secretary of State's database, \", \"italic\": true},{\"type\":\"link\", \"url\": \"https://www.concord-sots.ct.gov/CONCORD/\", \"children\":[{\"text\": \"CONCORD\"}]}]}]",
                            "dataType": "rtftext",
                            "fullWidth": true
                        },
                        {
                            "name": "applicationInformationNotice2",
                            "defaultValue": "[{\"children\": [{\"text\": \"If an applicant is an individual, provide the legal name (include suffix) in the following format: First Name; Middle Initial; Last Name; Suffix (Jr, Sr., II, III, etc.).\", \"italic\": true}]}]",
                            "dataType": "rtftext",
                            "fullWidth": true
                        },
                        {
                            "name": "applicationInformationNotice3",
                            "defaultValue": "[{\"children\": [{\"text\": \"If there are any changes or corrections to your company/facility or individual mailing or billing address or contact information, please complete and submit the \", \"italic\": true },{\"type\": \"link\", \"url\": \"https://portal.ct.gov/DEEP/Permits-and-Licenses/Common-Forms#companyinfo\", \"children\": [{\"text\": \"Request to Change Company/Individual Information\"}]},{\"text\": \" to the address indicated on the form. If there is a change in name of the entity holding a DEEP license or a change in ownership, contact the Office of Planning and Program Development (OPPD) at 860-424-3003.\", \"italic\": true }]}]",
                            "dataType": "rtftext",
                            "fullWidth": true
                        },
                        {
                            "dataType": "paragraph",
                            "label": "1. Applicant Information",
                            "fullWidth": true,
                            "fields": [
                                {
                                    "name": "Applicant Name",
                                    "label": "Applicant Name",
                                    "dataType": "string",
                                    "tooltip": "Applicant Name",
                                    "required": true
                                },
                                {
                                    "name": "Street",
                                    "label": "Mailing Address",
                                    "dataType": "string",
                                    "tooltip": "Mailing Address",
                                    "required": true
                                },
                                {
                                    "name": "CityTown",
                                    "label": "City/Town",
                                    "dataType": "string",
                                    "tooltip": "City/Town",
                                    "required": true
                                },
                                {
                                    "name": "State",
                                    "label": "State",
                                    "dataType": "string",
                                    "tooltip": "State",
                                    "required": true
                                },
                                {
                                    "name": "Zip code",
                                    "label": "Zip Code",
                                    "dataType": "number",
                                    "format": "#####",
                                    "width": 50,
                                    "tooltip": "Zip code",
                                    "required": true
                                },
                                {
                                    "name": "businessPhone",
                                    "label": "Business Phone",
                                    "dataType": "string",
                                    "required": true
                                },
                                {
                                    "name": "businessPhoneExt",
                                    "label": "Business Phone Ext",
                                    "dataType": "string"
                                },
                                {
                                    "name": "contactPerson",
                                    "label": "Contact Person",
                                    "dataType": "string",
                                    "tooltip": "Contact Person",
                                    "required": true
                                },
                                {
                                    "name": "Phone",
                                    "label": "Phone",
                                    "dataType": "string",
                                    "required": true
                                },
                                {
                                    "name": "PhoneExt",
                                    "label": "Phone Ext",
                                    "dataType": "string"
                                },
                                {
                                    "name": "email",
                                    "label": "E-mail",
                                    "dataType": "email",
                                    "required": true
                                },
                                {
                                    "name": "Fax",
                                    "label": "Fax",
                                    "dataType": "string"
                                }
                            ]
                        },
                        {
                            "name": "applicantType",
                            "label": "Applicant Type",
                            "dataType": "choices",
                            "fullWidth": true,
                            "inline": true,
                            "required": true,
                            "options": [
                                {
                                    "name": "individual",
                                    "value": "individual"
                                },
                                {
                                    "name": "federal agency",
                                    "value": "federalAgency"
                                },
                                {
                                    "name": "state agency",
                                    "value": "stateAgency"
                                },
                                {
                                    "name": "municipality",
                                    "value": "municipality"
                                },
                                {
                                    "name": "tribal",
                                    "value": "tribal"
                                },
                                {
                                    "name": "*business entity (if a business entity complete i through iv)",
                                    "value": "businessEntity"
                                }
                            ]
                        },
                        {
                            "name": "businessEntityI",
                            "label": "i) check type:",
                            "dataType": "choices",
                            "required": true,
                            "hiddenCondition": "applicantType!=businessEntity",
                            "options": [
                                {
                                    "name": "corporation",
                                    "value": "corporation"
                                },
                                {
                                    "name": "limited liability company",
                                    "value": "limited liability company"
                                },
                                {
                                    "name": "limited partnership",
                                    "value": "limited partnership"
                                },
                                {
                                    "name": "limited liability partnership",
                                    "value": "limited liability partnership"
                                },
                                {
                                    "name": "statutory trust",
                                    "value": "statutory trust"
                                },
                                {
                                    "name": "other",
                                    "value": "other"
                                }
                            ]
                        },
                        {
                            "name": "businessEntityII",
                            "label": "ii) provide Secretary of the State business ID #",
                            "dataType": "string",
                            "required": true,
                            "hiddenCondition": "applicantType!=businessEntity"
                        },
                        {
                            "name": "businessEntityIINotice",
                            "defaultValue": "[{\"children\": [{\"text\": \"This information can be accessed at \" },{\"type\":\"link\", \"url\":\"http://www.concord-sots.ct.gov/CONCORD/index.jsp\", \"children\": [{\"text\": \"CONCORD\", \"italic\": true}]}]}]",
                            "dataType": "rtftext",
                            "hiddenCondition": "applicantType!=businessEntity"
                        },
                        {
                            "name": "businessEntityIII",
                            "label": "iii) check here if your business is NOT registered with the Secretary of State's office.",
                            "dataType": "checkbox",
                            "required": true,
                            "hiddenCondition": "applicantType!=businessEntity"
                        },
                        {
                            "name": "businessEntityIV",
                            "label": "iv) what is the date of incorporation:",
                            "dataType": "date",
                            "required": true,
                            "hiddenCondition": "applicantType!=businessEntity"
                        },
                        {
                            "name": "coApplicants",
                            "label": "Check if any co-applicants. If so, attach additional sheet(s) with the required information as requested above",
                            "dataType": "checkbox",
                            "required": true,
                            "hiddenCondition": "applicantType!=businessEntity"
                        },
                        {
                            "dataType": "paragraph",
                            "label": "2. Applicants Location Address, if different than the mailing address listed above.",
                            "fullWidth": true,
                            "fields": [
                                {
                                    "name": "applicantStreet",
                                    "label": "Address",
                                    "dataType": "string",
                                    "tooltip": "Address",
                                    "required": true
                                },
                                {
                                    "name": "applicantCityTown",
                                    "label": "City/Town",
                                    "dataType": "string",
                                    "tooltip": "City/Town",
                                    "required": true
                                },
                                {
                                    "name": "applicantState",
                                    "label": "State",
                                    "dataType": "string",
                                    "tooltip": "State",
                                    "required": true
                                },
                                {
                                    "name": "applicantZipCode",
                                    "label": "Zip Code",
                                    "dataType": "number",
                                    "format": "#####",
                                    "width": 50,
                                    "tooltip": "Zip code",
                                    "required": true
                                }
                            ]
                        },
                        {
                            "dataType": "paragraph",
                            "label": "3. Primary contact for departmental correspondence and inquires, if different than the applicant.",
                            "fullWidth": true,
                            "fields": [
                                {
                                    "name": "PrimaryName",
                                    "label": "Applicant Name",
                                    "dataType": "string",
                                    "tooltip": "ApplicantName",
                                    "required": true
                                },
                                {
                                    "name": "PrimaryStreet",
                                    "label": "Mailing Address",
                                    "dataType": "string",
                                    "tooltip": "Street",
                                    "required": true
                                },
                                {
                                    "name": "PrimaryCityTown",
                                    "label": "City/Town",
                                    "dataType": "string",
                                    "tooltip": "City/Town",
                                    "required": true
                                },
                                {
                                    "name": "PrimaryState",
                                    "label": "State",
                                    "dataType": "string",
                                    "tooltip": "State",
                                    "required": true
                                },
                                {
                                    "name": "PrimaryZipCode",
                                    "label": "Zip Code",
                                    "dataType": "number",
                                    "format": "#####",
                                    "width": 50,
                                    "tooltip": "Zip code",
                                    "required": true
                                },
                                {
                                    "name": "PrimarybPhone",
                                    "label": "Business Phone",
                                    "dataType": "string",
                                    "required": true
                                },
                                {
                                    "name": "PrimarybPhoneExt",
                                    "label": "Business Phone Ext",
                                    "dataType": "string"
                                },
                                {
                                    "name": "PrimaryContactPerson",
                                    "label": "Contact Person",
                                    "dataType": "string",
                                    "tooltip": "Contact Person",
                                    "required": true
                                },
                                {
                                    "name": "PrimaryPhone",
                                    "label": "Phone",
                                    "dataType": "string",
                                    "required": true
                                },
                                {
                                    "name": "PrimaryPhoneExt",
                                    "label": "Phone Ext",
                                    "dataType": "string"
                                },
                                {
                                    "name": "PrimaryEmail",
                                    "label": "E-mail",
                                    "dataType": "email",
                                    "required": true
                                },
                                {
                                    "name": "PrimaryFax",
                                    "label": "Fax",
                                    "dataType": "string"
                                }
                            ]
                        },
                        {
                            "name": "PartIIINotice",
                            "defaultValue": "**By providing this e-mail address you are agreeing to receive official correspondence from the department, at this electronic address, concerning the subject application. Please remember to check your security settings to be sure you can receive e-mails from “ct.gov” addresses. Also, please notify the department if your e-mail address changes.",
                            "dataType": "rtftext",
                            "fullWidth": true
                        },
                        {
                            "dataType": "paragraph",
                            "label": "4. Attorney or other representative, if applicable:",
                            "fullWidth": true,
                            "fields": [
                                {
                                    "name": "FirmName",
                                    "label": "Firm Name",
                                    "dataType": "string",
                                    "tooltip": "Firm name",
                                    "required": true
                                },
                                {
                                    "name": "FirmStreet",
                                    "label": "Firm Mailing Address",
                                    "dataType": "string",
                                    "tooltip": "Street",
                                    "required": true
                                },
                                {
                                    "name": "FirmCityTown",
                                    "label": "City/Town",
                                    "dataType": "string",
                                    "tooltip": "City/Town",
                                    "required": true
                                },
                                {
                                    "name": "FirmState",
                                    "label": "State",
                                    "dataType": "string",
                                    "tooltip": "State",
                                    "required": true
                                },
                                {
                                    "name": "FirmZip code",
                                    "label": "Zip code",
                                    "dataType": "number",
                                    "format": "#####",
                                    "width": 50,
                                    "tooltip": "Zip code",
                                    "required": true
                                },
                                {
                                    "name": "FirmBusinessPhone",
                                    "label": "Business Phone",
                                    "dataType": "string",
                                    "required": true
                                },
                                {
                                    "name": "FirmBusinessPhoneExt",
                                    "label": "Business Phone Ext",
                                    "dataType": "string"
                                },
                                {
                                    "name": "FirmAttorney",
                                    "label": "Attorney",
                                    "dataType": "string",
                                    "required": true
                                },
                                {
                                    "name": "FirmPhone",
                                    "label": "Phone",
                                    "dataType": "string",
                                    "required": true
                                },
                                {
                                    "name": "FirmPhoneExt",
                                    "label": "Phone Ext",
                                    "dataType": "string"
                                },
                                {
                                    "name": "FirmEmail",
                                    "label": "E-mail",
                                    "dataType": "email",
                                    "required": true
                                },
                                {
                                    "name": "FirmFax",
                                    "label": "Fax",
                                    "dataType": "string"
                                }
                            ]
                        }
                    ]
                },
                {
                    "title": "Part IV: Activity or Company Information",
                    "expanded": false,
                    "fields": [
                        {
                            "dataType": "paragraph",
                            "label": "TYPE OF BUSINESS",
                            "fields": [
                                {
                                    "dataType": "choices",
                                    "label": "1. Check the appropriate box(es) for all waste types that the applicant is in the business of transporting or proposes to transport:",
                                    "multivalue": true,
                                    "inline": true,
                                    "name": "wasteTypes",
                                    "ui": "rtf",
                                    "required": true,
                                    "hiddenCondition": "Permit Type==BiomedicalWasteTransporter",
                                    "options": [
                                        {
                                            "value": "NonRCRAHazardousWaste",
                                            "name": "[{\"children\": [{\"type\":\"link\", \"url\":\"https://portal.ct.gov/DEEP/Waste-Management-and-Disposal/Hazardous-Waste/Connecticut-Regulated-Waste\", \"children\":[{\"text\": \"Non-RCRA Hazardous Waste\"}]}]}]",
                                            "tooltip": "Non-RCRA Hazardous Waste"
                                        },
                                        {
                                            "value": "RCRAHazardousWaste",
                                            "name": "[{\"children\": [{\"type\":\"link\", \"url\":\"https://portal.ct.gov/DEEP/Waste-Management-and-Disposal/Hazardous-Waste/What-is-Hazardous-Waste\", \"children\":[{\"text\": \"RCRA Hazardous Waste\"}]}]}]",
                                            "tooltip": "RCRA Hazardous Waste"
                                        },
                                        {
                                            "value": "BiomedicalWaste",
                                            "name": "[{\"children\": [{\"type\":\"link\", \"url\":\"https://portal.ct.gov/DEEP/Waste-Management-and-Disposal/Biomedical-Waste/Biomedical-Waste-Home\", \"children\":[{\"text\": \"Biomedical Waste\"}]}]}]",
                                            "tooltip": "Biomedical Waste"
                                        }
                                    ]
                                },
                                {
                                    "dataType": "choices",
                                    "label": "1. Check the appropriate box(es) for all waste types that the applicant is in the business of transporting or proposes to transport:",
                                    "multivalue": true,
                                    "inline": true,
                                    "name": "wasteTypes1",
                                    "ui": "rtf",
                                    "hiddenCondition": "Permit Type!=BiomedicalWasteTransporter",
                                    "defaultValue": "BiomedicalWaste",
                                    "readOnly": true,
                                    "options": [
                                        {
                                            "value": "NonRCRAHazardousWaste",
                                            "name": "[{\"children\": [{\"type\":\"link\", \"url\":\"https://portal.ct.gov/DEEP/Waste-Management-and-Disposal/Hazardous-Waste/Connecticut-Regulated-Waste\", \"children\":[{\"text\": \"Non-RCRA Hazardous Waste\"}]}]}]",
                                            "tooltip": "Non-RCRA Hazardous Waste"
                                        },
                                        {
                                            "value": "RCRAHazardousWaste",
                                            "name": "[{\"children\": [{\"type\":\"link\", \"url\":\"https://portal.ct.gov/DEEP/Waste-Management-and-Disposal/Hazardous-Waste/What-is-Hazardous-Waste\", \"children\":[{\"text\": \"RCRA Hazardous Waste\"}]}]}]",
                                            "tooltip": "RCRA Hazardous Waste"
                                        },
                                        {
                                            "value": "BiomedicalWaste",
                                            "name": "[{\"children\": [{\"type\":\"link\", \"url\":\"https://portal.ct.gov/DEEP/Waste-Management-and-Disposal/Biomedical-Waste/Biomedical-Waste-Home\", \"children\":[{\"text\": \"Biomedical Waste\"}]}]}]",
                                            "tooltip": "Biomedical Waste"
                                        }
                                    ]
                                },
                                {
                                    "name": "transferOfHazardousWaste",
                                    "label": "2. Will the applicant engage in the transfer of hazardous waste from one vehicle to another or one mode of transport to another in the State of Connecticut?",
                                    "dataType": "choices",
                                    "inline": true,
                                    "required": true,
                                    "options": [
                                        {
                                            "name": "Yes",
                                            "value": "true"
                                        },
                                        {
                                            "name": "No",
                                            "value": "false"
                                        }
                                    ]
                                },
                                {
                                    "name": "transferOfHazardousWasteNotice",
                                    "defaultValue": "If you answered yes, then you must also apply for a CGS Section 22a-454 Waste Facility permit. For assistance in applying for this permit, or if you have questions on this process, please contact the Bureau of Materials Management and Compliance Assurance at 860-424-3366.",
                                    "dataType": "rtftext",
                                    "hiddenCondition": "transferOfHazardousWaste!=true",
                                    "fullWidth": true
                                }
                            ]
                        },
                        {
                            "dataType": "paragraph",
                            "label": "GENERAL INFORMATION",
                            "fields": [
                                {
                                    "name": "generalInformation",
                                    "label": "3. Do you desire to be on our Public List of Waste Transporters?",
                                    "dataType": "choices",
                                    "inline": true,
                                    "required": true,
                                    "options": [
                                        {
                                            "name": "Yes",
                                            "value": "true"
                                        },
                                        {
                                            "name": "No",
                                            "value": "false"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "title": "Part V: Applicant/Owner Information",
                    "expanded": false,
                    "fields": [
                        {
                            "dataType": "paragraph",
                            "label": "SECTION 1",
                            "fields": [
                                {
                                    "name": "legalOwnersCount",
                                    "label": "How many legal owners of the business?",
                                    "dataType": "int"
                                },
                                {
                                    "dataType": "paragraph",
                                    "label": "a. Identify all legal owners, their ownership type and if a corporation list the names and titles of all corporate officers",
                                    "fullWidth": true,
                                    "fields": [
                                        {
                                            "name": "LegalOwnerName",
                                            "label": "Name",
                                            "dataType": "string",
                                            "tooltip": "ApplicantName"
                                        },
                                        {
                                            "name": "LegalOwnerStreet",
                                            "label": "Mailing Address",
                                            "dataType": "string",
                                            "tooltip": "Street"
                                        },
                                        {
                                            "name": "LegalOwnerCityTown",
                                            "label": "City/Town",
                                            "dataType": "string",
                                            "tooltip": "City/Town"
                                        },
                                        {
                                            "name": "LegalOwnerState",
                                            "label": "State",
                                            "dataType": "string",
                                            "tooltip": "State"
                                        },
                                        {
                                            "name": "LegalOwnerZipCode",
                                            "label": "Zip Code",
                                            "dataType": "number",
                                            "format": "#####",
                                            "width": 50,
                                            "tooltip": "Zip code"
                                        },
                                        {
                                            "name": "LegalOwnerbPhone",
                                            "label": "Business Phone",
                                            "dataType": "string"
                                        },
                                        {
                                            "name": "LegalOwnerbPhoneExt",
                                            "label": "Business Phone Ext",
                                            "dataType": "string"
                                        },
                                        {
                                            "name": "LegalOwnerContactPerson",
                                            "label": "Contact Person",
                                            "dataType": "string",
                                            "tooltip": "Contact Person"
                                        },
                                        {
                                            "name": "LegalOwnerPhone",
                                            "label": "Phone",
                                            "dataType": "string"
                                        },
                                        {
                                            "name": "LegalOwnerPhoneExt",
                                            "label": "Phone Ext",
                                            "dataType": "string"
                                        },
                                        {
                                            "name": "LegalOwnerEmail",
                                            "label": "E-mail",
                                            "dataType": "email"
                                        },
                                        {
                                            "name": "LegalOwnerChoice",
                                            "label": "Owner Type (check one):",
                                            "dataType": "choices",
                                            "options": [
                                                {
                                                    "name": "Proprietorship",
                                                    "value": "Proprietorship"
                                                },
                                                {
                                                    "name": "Partnership",
                                                    "value": "Partnership"
                                                },
                                                {
                                                    "name": "Corporation",
                                                    "value": "Corporation"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "dataType": "paragraph",
                                    "label": "b. If a corporation, complete the following:",
                                    "fullWidth": true,
                                    "fields": [
                                        {
                                            "name": "IncorporationDate",
                                            "label": "Date of Incorporation",
                                            "dataType": "date"
                                        },
                                        {
                                            "name": "IncorporationCity",
                                            "label": "City",
                                            "dataType": "string"
                                        },
                                        {
                                            "name": "IncorporationState",
                                            "label": "State",
                                            "dataType": "string"
                                        },
                                        {
                                            "dataType": "paragraph",
                                            "label": "List the names, titles and addresses of all corporate officers:",
                                            "fullWidth": true,
                                            "fields": [
                                                {
                                                    "name": "CorporateName1",
                                                    "label": "Name",
                                                    "dataType": "string",
                                                    "tooltip": "Name"
                                                },
                                                {
                                                    "name": "CorporateStreet1",
                                                    "label": "Mailing Address",
                                                    "dataType": "string",
                                                    "tooltip": "Street"
                                                },
                                                {
                                                    "name": "CorporateCityTown1",
                                                    "label": "City/Town",
                                                    "dataType": "string",
                                                    "tooltip": "City/Town"
                                                },
                                                {
                                                    "name": "CorporateState1",
                                                    "label": "State",
                                                    "dataType": "string",
                                                    "tooltip": "State"
                                                },
                                                {
                                                    "name": "CorporateZipCode1",
                                                    "label": "Zip Code",
                                                    "dataType": "number",
                                                    "format": "#####",
                                                    "width": 50,
                                                    "tooltip": "Zip code"
                                                },
                                                {
                                                    "name": "CorporatebPhone1",
                                                    "label": "Business Phone",
                                                    "dataType": "string"
                                                },
                                                {
                                                    "name": "LegalOwnerbPhoneExt1",
                                                    "label": "ext.",
                                                    "dataType": "string"
                                                },
                                                {
                                                    "name": "CorporateTitle1",
                                                    "label": "Title",
                                                    "dataType": "string"
                                                },
                                                {
                                                    "name": "CorporateEmail1",
                                                    "label": "E-mail",
                                                    "dataType": "email"
                                                }
                                            ]
                                        },
                                        {
                                            "name": "partVCorporate1Seperator",
                                            "defaultValue": "--------------------------------------------------------------------------------------------------------------------------",
                                            "dataType": "rtftext",
                                            "fullWidth": true
                                        },
                                        {
                                            "dataType": "paragraph",
                                            "fullWidth": true,
                                            "fields": [
                                                {
                                                    "name": "CorporateName2",
                                                    "label": "Name",
                                                    "dataType": "string",
                                                    "tooltip": "Name"
                                                },
                                                {
                                                    "name": "CorporateStreet2",
                                                    "label": "Mailing Address",
                                                    "dataType": "string",
                                                    "tooltip": "Street"
                                                },
                                                {
                                                    "name": "CorporateCityTown2",
                                                    "label": "City/Town",
                                                    "dataType": "string",
                                                    "tooltip": "City/Town"
                                                },
                                                {
                                                    "name": "CorporateState2",
                                                    "label": "State",
                                                    "dataType": "string",
                                                    "tooltip": "State"
                                                },
                                                {
                                                    "name": "CorporateZipCode2",
                                                    "label": "Zip Code",
                                                    "dataType": "number",
                                                    "format": "#####",
                                                    "width": 50,
                                                    "tooltip": "Zip code"
                                                },
                                                {
                                                    "name": "CorporatebPhone2",
                                                    "label": "Business Phone",
                                                    "dataType": "string"
                                                },
                                                {
                                                    "name": "LegalOwnerbPhoneExt2",
                                                    "label": "ext.",
                                                    "dataType": "string"
                                                },
                                                {
                                                    "name": "CorporateTitle2",
                                                    "label": "Title",
                                                    "dataType": "string"
                                                },
                                                {
                                                    "name": "CorporateEmail2",
                                                    "label": "E-mail",
                                                    "dataType": "email"
                                                }
                                            ]
                                        },
                                        {
                                            "name": "partVCorporate2Seperator",
                                            "defaultValue": "--------------------------------------------------------------------------------------------------------------------------",
                                            "dataType": "rtftext",
                                            "fullWidth": true
                                        },
                                        {
                                            "dataType": "paragraph",
                                            "fullWidth": true,
                                            "fields": [
                                                {
                                                    "name": "CorporateName3",
                                                    "label": "Name",
                                                    "dataType": "string",
                                                    "tooltip": "Name"
                                                },
                                                {
                                                    "name": "CorporateStreet3",
                                                    "label": "Mailing Address",
                                                    "dataType": "string",
                                                    "tooltip": "Street"
                                                },
                                                {
                                                    "name": "CorporateCityTown3",
                                                    "label": "City/Town",
                                                    "dataType": "string",
                                                    "tooltip": "City/Town"
                                                },
                                                {
                                                    "name": "CorporateState3",
                                                    "label": "State",
                                                    "dataType": "string",
                                                    "tooltip": "State"
                                                },
                                                {
                                                    "name": "CorporateZipCode3",
                                                    "label": "Zip Code",
                                                    "dataType": "number",
                                                    "format": "#####",
                                                    "width": 50,
                                                    "tooltip": "Zip code"
                                                },
                                                {
                                                    "name": "CorporatebPhone3",
                                                    "label": "Business Phone",
                                                    "dataType": "string"
                                                },
                                                {
                                                    "name": "LegalOwnerbPhoneExt3",
                                                    "label": "ext.",
                                                    "dataType": "string"
                                                },
                                                {
                                                    "name": "CorporateTitle3",
                                                    "label": "Title",
                                                    "dataType": "string"
                                                },
                                                {
                                                    "name": "CorporateEmail3",
                                                    "label": "E-mail",
                                                    "dataType": "email"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "name": "CorporationAdditionalSheetCheck",
                                    "label": "Check here if additional sheets are necessary, and label them to this sheet.",
                                    "dataType": "checkbox"
                                }
                            ]
                        },
                        {
                            "dataType": "paragraph",
                            "label": "SECTION 2",
                            "fields": [
                                {
                                    "name": "otherOwners",
                                    "label": "Does the applicant or owner(s) stated in section 1, including all partners and corporate officers, engage in other activites or own other companies that transport, treat, store, recover, or dispose of oil and chemical waste, hazardous waste, adn/or biomedical waste?",
                                    "dataType": "choices",
                                    "inline": true,
                                    "options": [
                                        {
                                            "name": "Yes",
                                            "value": "true"
                                        },
                                        {
                                            "name": "No",
                                            "value": "false"
                                        }
                                    ]
                                },
                                {
                                    "dataType": "paragraph",
                                    "name": "otherOwnersCompanies",
                                    "label": "If yes was checked, identify the owners of such companies or activities, the name of the company, the company address and the type of activities performed.",
                                    "hiddenCondition": "otherOwners!=true",
                                    "fullWidth": true,
                                    "fields": [
                                        {
                                            "dataType": "paragraph",
                                            "fullWidth": true,
                                            "fields": [
                                                {
                                                    "name": "otherOwnerName1",
                                                    "label": "Owner's Name",
                                                    "dataType": "string",
                                                    "tooltip": "Owner's Name"
                                                },
                                                {
                                                    "name": "otherOwnerStreet1",
                                                    "label": "Company Address",
                                                    "dataType": "string",
                                                    "tooltip": "Company Address"
                                                },
                                                {
                                                    "name": "otherOwnerCityTown1",
                                                    "label": "City/Town",
                                                    "dataType": "string",
                                                    "tooltip": "City/Town"
                                                },
                                                {
                                                    "name": "otherOwnerState1",
                                                    "label": "State",
                                                    "dataType": "string",
                                                    "tooltip": "State"
                                                },
                                                {
                                                    "name": "otherOwnerZipCode1",
                                                    "label": "Zip Code",
                                                    "dataType": "number",
                                                    "format": "#####",
                                                    "width": 50,
                                                    "tooltip": "Zip code"
                                                },
                                                {
                                                    "name": "otherOwnerActivityType1",
                                                    "label": "Type of Activity",
                                                    "dataType": "string",
                                                    "tooltip": "Type of Activity"
                                                }
                                            ]
                                        },
                                        {
                                            "name": "partVOtherOwner1Seperator",
                                            "defaultValue": "--------------------------------------------------------------------------------------------------------------------------",
                                            "dataType": "rtftext",
                                            "fullWidth": true
                                        },
                                        {
                                            "dataType": "paragraph",
                                            "fullWidth": true,
                                            "fields": [
                                                {
                                                    "name": "otherOwnerName2",
                                                    "label": "Owner's Name",
                                                    "dataType": "string",
                                                    "tooltip": "Owner's Name"
                                                },
                                                {
                                                    "name": "otherOwnerStreet2",
                                                    "label": "Company Address",
                                                    "dataType": "string",
                                                    "tooltip": "Company Address"
                                                },
                                                {
                                                    "name": "otherOwnerCityTown2",
                                                    "label": "City/Town",
                                                    "dataType": "string",
                                                    "tooltip": "City/Town"
                                                },
                                                {
                                                    "name": "otherOwnerState2",
                                                    "label": "State",
                                                    "dataType": "string",
                                                    "tooltip": "State"
                                                },
                                                {
                                                    "name": "otherOwnerZipCode2",
                                                    "label": "Zip Code",
                                                    "dataType": "number",
                                                    "format": "#####",
                                                    "width": 50,
                                                    "tooltip": "Zip code"
                                                },
                                                {
                                                    "name": "otherOwnerActivityType2",
                                                    "label": "Type of Activity",
                                                    "dataType": "string",
                                                    "tooltip": "Type of Activity"
                                                }
                                            ]
                                        },
                                        {
                                            "name": "partVOtherOwner2Seperator",
                                            "defaultValue": "--------------------------------------------------------------------------------------------------------------------------",
                                            "dataType": "rtftext",
                                            "fullWidth": true
                                        },
                                        {
                                            "dataType": "paragraph",
                                            "fullWidth": true,
                                            "fields": [
                                                {
                                                    "name": "otherOwnerName3",
                                                    "label": "Owner's Name",
                                                    "dataType": "string",
                                                    "tooltip": "Owner's Name"
                                                },
                                                {
                                                    "name": "otherOwnerStreet3",
                                                    "label": "Company Address",
                                                    "dataType": "string",
                                                    "tooltip": "Company Address"
                                                },
                                                {
                                                    "name": "otherOwnerCityTown3",
                                                    "label": "City/Town",
                                                    "dataType": "string",
                                                    "tooltip": "City/Town"
                                                },
                                                {
                                                    "name": "otherOwnerState3",
                                                    "label": "State",
                                                    "dataType": "string",
                                                    "tooltip": "State"
                                                },
                                                {
                                                    "name": "otherOwnerZipCode3",
                                                    "label": "Zip Code",
                                                    "dataType": "number",
                                                    "format": "#####",
                                                    "width": 50,
                                                    "tooltip": "Zip code"
                                                },
                                                {
                                                    "name": "otherOwnerActivityType3",
                                                    "label": "Type of Activity",
                                                    "dataType": "string",
                                                    "tooltip": "Type of Activity"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "dataType": "paragraph",
                            "label": "SECTION 3",
                            "fields": [
                                {
                                    "name": "wasteTransporterSiteCount",
                                    "label": "List the number of waste transportation sites that the applicant operates in Connecticut:",
                                    "dataType": "int"
                                },
                                {
                                    "dataType": "paragraph",
                                    "name": "siteManagers",
                                    "label": "Identify the managers of each of the sites located in Connecticut.",
                                    "fullWidth": true,
                                    "fields": [
                                        {
                                            "dataType": "paragraph",
                                            "fullWidth": true,
                                            "fields": [
                                                {
                                                    "name": "siteManagerName1",
                                                    "label": "Name",
                                                    "dataType": "string",
                                                    "tooltip": "Name"
                                                },
                                                {
                                                    "name": "siteManagerStreet1",
                                                    "label": "Site Address",
                                                    "dataType": "string",
                                                    "tooltip": "Site Address"
                                                },
                                                {
                                                    "name": "siteManagerCityTown1",
                                                    "label": "City/Town",
                                                    "dataType": "string",
                                                    "tooltip": "City/Town"
                                                },
                                                {
                                                    "name": "siteManagerState1",
                                                    "label": "State",
                                                    "dataType": "string",
                                                    "tooltip": "State"
                                                },
                                                {
                                                    "name": "siteManagerZipCode1",
                                                    "label": "Zip Code",
                                                    "dataType": "number",
                                                    "format": "#####",
                                                    "width": 50,
                                                    "tooltip": "Zip code"
                                                },
                                                {
                                                    "name": "siteManagerbPhone1",
                                                    "label": "Business Phone",
                                                    "dataType": "string",
                                                    "tooltip": "Business Phone"
                                                },
                                                {
                                                    "name": "siteManagerbPhoneExt1",
                                                    "label": "ext.",
                                                    "dataType": "string",
                                                    "tooltip": "Extention"
                                                }
                                            ]
                                        },
                                        {
                                            "name": "partVSiteManager1Seperator",
                                            "defaultValue": "--------------------------------------------------------------------------------------------------------------------------",
                                            "dataType": "rtftext",
                                            "fullWidth": true
                                        },
                                        {
                                            "dataType": "paragraph",
                                            "fullWidth": true,
                                            "fields": [
                                                {
                                                    "name": "siteManagerName2",
                                                    "label": "Name",
                                                    "dataType": "string",
                                                    "tooltip": "Name"
                                                },
                                                {
                                                    "name": "siteManagerStreet2",
                                                    "label": "Site Address",
                                                    "dataType": "string",
                                                    "tooltip": "Site Address"
                                                },
                                                {
                                                    "name": "siteManagerCityTown2",
                                                    "label": "City/Town",
                                                    "dataType": "string",
                                                    "tooltip": "City/Town"
                                                },
                                                {
                                                    "name": "siteManagerState2",
                                                    "label": "State",
                                                    "dataType": "string",
                                                    "tooltip": "State"
                                                },
                                                {
                                                    "name": "siteManagerZipCode2",
                                                    "label": "Zip Code",
                                                    "dataType": "number",
                                                    "format": "#####",
                                                    "width": 50,
                                                    "tooltip": "Zip code"
                                                },
                                                {
                                                    "name": "siteManagerbPhone2",
                                                    "label": "Business Phone",
                                                    "dataType": "string",
                                                    "tooltip": "Business Phone"
                                                },
                                                {
                                                    "name": "siteManagerbPhoneExt2",
                                                    "label": "ext.",
                                                    "dataType": "string",
                                                    "tooltip": "Extension"
                                                }
                                            ]
                                        },
                                        {
                                            "name": "partVSiteManager2Seperator",
                                            "defaultValue": "--------------------------------------------------------------------------------------------------------------------------",
                                            "dataType": "rtftext",
                                            "fullWidth": true
                                        },
                                        {
                                            "dataType": "paragraph",
                                            "fullWidth": true,
                                            "fields": [
                                                {
                                                    "name": "siteManagerName3",
                                                    "label": "Name",
                                                    "dataType": "string",
                                                    "tooltip": "Name"
                                                },
                                                {
                                                    "name": "siteManagerStreet3",
                                                    "label": "Site Address",
                                                    "dataType": "string",
                                                    "tooltip": "Site Address"
                                                },
                                                {
                                                    "name": "siteManagerCityTown3",
                                                    "label": "City/Town",
                                                    "dataType": "string",
                                                    "tooltip": "City/Town"
                                                },
                                                {
                                                    "name": "siteManagerState3",
                                                    "label": "State",
                                                    "dataType": "string",
                                                    "tooltip": "State"
                                                },
                                                {
                                                    "name": "siteManagerZipCode3",
                                                    "label": "Zip Code",
                                                    "dataType": "number",
                                                    "format": "#####",
                                                    "width": 50,
                                                    "tooltip": "Zip code"
                                                },
                                                {
                                                    "name": "siteManagerbPhone3",
                                                    "label": "Business Phone",
                                                    "dataType": "string",
                                                    "tooltip": "Business Phone"
                                                },
                                                {
                                                    "name": "siteManagerbPhoneExt3",
                                                    "label": "ext.",
                                                    "dataType": "string",
                                                    "tooltip": "Extension"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "name": "section2or3AdditionalSheetCheck",
                                    "label": "Check here if additional sheets are necessary to complete sections 2 or 3, and label and attach them to this sheet.",
                                    "dataType": "checkbox"
                                }
                            ]
                        }
                    ]
                },
                {
                    "title": "Part VI: List of Transporter Permits Held in Other States",
                    "expanded": false,
                    "fields": [
                        {
                            "name": "partVINotice",
                            "defaultValue": "Complete the table by listing each type of transporter permit held in another state, the state that issued each permit, the permit number and the permit expiration date:",
                            "dataType": "rtftext",
                            "fullWidth": true
                        },
                        {
                            "name": "partVITable",
                            "dataType": "table",
                            "multiValue": true,
                            "fullWidth": true,
                            "fieldset": {
                                "fields": [
                                    {
                                        "name": "partVIPermitType",
                                        "label": "Permit Type",
                                        "dataType": "string",
                                        "favorite": false,
                                        "tooltip": "Permit Type"
                                    },
                                    {
                                        "name": "partVIState",
                                        "label": "State",
                                        "dataType": "string",
                                        "favorite": false,
                                        "tooltip": "State"
                                    },
                                    {
                                        "name": "partVIPermitNumber",
                                        "label": "Permit Number",
                                        "dataType": "string",
                                        "favorite": false,
                                        "tooltip": "Permit Number"
                                    },
                                    {
                                        "name": "partVIExpirationDate",
                                        "label": "Expiration Date",
                                        "dataType": "date",
                                        "favorite": false,
                                        "tooltip": "Expiration Date"
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "title": "Part VIIA: Non-RCRA Hazardous Waste",
                    "expanded": false,
                    "fields": [
                        {
                            "name": "partVIIANotice",
                            "defaultValue": "Complete the table by listing the type(s) of waste intended to be transported and the waste disposal information:",
                            "dataType": "rtftext",
                            "fullWidth": true
                        },
                        {
                            "name": "partVIIATable",
                            "dataType": "table",
                            "multiValue": true,
                            "fullWidth": true,
                            "fieldset": {
                                "fields": [
                                    {
                                        "name": "partVIIAWasteNumber",
                                        "label": "Waste Number",
                                        "dataType": "string",
                                        "favorite": false,
                                        "tooltip": "Waste Number"
                                    },
                                    {
                                        "name": "partVIIAWasteName",
                                        "label": "Waste Name",
                                        "dataType": "string",
                                        "favorite": false,
                                        "tooltip": "Waste Name"
                                    },
                                    {
                                        "name": "partVIIAPandC",
                                        "label": "P&C Characteristic of Waste",
                                        "dataType": "string",
                                        "favorite": false,
                                        "tooltip": "Physical and Chemical Characteristics of Waste"
                                    },
                                    {
                                        "name": "partVIIAFacilityAddress",
                                        "label": " Facility Name & Address",
                                        "dataType": "string",
                                        "favorite": false,
                                        "tooltip": "Waste Management Facility Name and Address"
                                    },
                                    {
                                        "name": "partVIIAFacilityManagement",
                                        "label": "Facility Management Methods",
                                        "dataType": "string",
                                        "favorite": false,
                                        "tooltip": "Facility Management Method(s)"
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "title": "Part VIIB: RCRA Hazardous Waste [CGS Section 22a-449(c)]",
                    "expanded": false,
                    "fields": [
                        {
                            "name": "partVIIBNotice",
                            "defaultValue": "Complete the table by listing the type(s) of waste intended to be transported and waste disposal information:",
                            "dataType": "rtftext",
                            "fullWidth": true
                        },
                        {
                            "name": "partVIIBTable",
                            "dataType": "table",
                            "multiValue": true,
                            "fullWidth": true,
                            "fieldset": {
                                "fields": [
                                    {
                                        "name": "partVIIBWasteNumber",
                                        "label": "EPA Waste Number",
                                        "dataType": "string",
                                        "favorite": false,
                                        "tooltip": "EPA Waste Number",
                                        "selectorId": "EPAWasteNumbersSelector",
                                        "_links": {
                                            "selector": {
                                                "href": "./api/1.0.0/selectors/EPAWasteNumbersSelector",
                                                "type": "application/json"
                                            }
                                        }
                                    },
                                    {
                                        "name": "partVIIBFacilityAddress",
                                        "label": "Facility Name & Address",
                                        "dataType": "string",
                                        "favorite": false,
                                        "tooltip": "Waste Management Facility Name and Address"
                                    },
                                    {
                                        "name": "partVIIBFacilityManagement",
                                        "label": "Facility Management Methods",
                                        "dataType": "string",
                                        "favorite": false,
                                        "tooltip": "Facility Management Method(s)"
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "title": "Part VIIC: Biomedical Waste [CGS Section 22a-208(a)]",
                    "expanded": false,
                    "fields": [
                        {
                            "name": "partVIICNotice",
                            "defaultValue": "Complete the table by listing the type(s) of waste intended to be transported and waste disposal information:",
                            "dataType": "rtftext",
                            "fullWidth": true
                        },
                        {
                            "name": "partVIICTable",
                            "dataType": "table",
                            "multiValue": true,
                            "fullWidth": true,
                            "fieldset": {
                                "fields": [
                                    {
                                        "name": "partVIICWasteTypeColumn",
                                        "label": "Type of Waste",
                                        "dataType": "string",
                                        "favorite": false,
                                        "tooltip": "Type of Waste (e.g., chemotherapy waste, pathological waste, other, etc.)"
                                    },
                                    {
                                        "name": "partVIICFacilityAddressCoulmn",
                                        "label": "Facility Name and Address",
                                        "dataType": "string",
                                        "favorite": false,
                                        "tooltip": "Facility Name and Address"
                                    },
                                    {
                                        "name": "partVIICFacilityTypeColumn",
                                        "label": "Facility Type",
                                        "dataType": "string",
                                        "favorite": false,
                                        "tooltip": "Facility Type (e.g., biomedical waste transfer facility, transfer station, etc.)"
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "title": "Part VIII: Supplemental Application for Spill Clean-Up Contractors",
                    "expanded": false,
                    "fields": [
                        {
                            "name": "partVIIINotice",
                            "defaultValue": "[{\"children\": [{\"text\": \"(please do not submit with Hazardous Waste or Biomedical Waste Transporter application if not applying for a Spill Clean-up Contractor Permit)\", \"bold\":true, \"italic\":true}]}]",
                            "dataType": "rtftext",
                            "fullWidth": true
                        },
                        {
                            "name": "partVIIISpillCleanUpForm",
                            "dataType": "paragraph",
                            "fullWidth": true,
                            "fields": [
                                {
                                    "name": "partVIIIApplicantName",
                                    "label": "1. Applicant Name",
                                    "dataType": "string",
                                    "tooltip": "Applicant Name"
                                },
                                {
                                    "name": "partVIIIApplicantNameNotice",
                                    "defaultValue": "(as indicated on the Application Form)",
                                    "dataType": "rtftext",
                                    "fullWidth": true
                                },
                                {
                                    "name": "partVIIICompanyName",
                                    "label": "2. Company Name",
                                    "dataType": "string",
                                    "tooltip": "Company Name"
                                },
                                {
                                    "name": "partVIIIMailingAddress",
                                    "label": "Mailing Address",
                                    "dataType": "string",
                                    "tooltip": "Mailing Address"
                                },
                                {
                                    "name": "partVIIICityTown",
                                    "label": "City/Town",
                                    "dataType": "string",
                                    "tooltip": "City/Town"
                                },
                                {
                                    "name": "partVIIIState",
                                    "label": "State",
                                    "dataType": "string",
                                    "tooltip": "State"
                                },
                                {
                                    "name": "partVIIIZipCode",
                                    "label": "Zip Code",
                                    "dataType": "number",
                                    "format": "#####",
                                    "width": 50,
                                    "tooltip": "Zip code"
                                },
                                {
                                    "name": "partVIIIbPhone",
                                    "label": "Business Phone",
                                    "dataType": "string"
                                },
                                {
                                    "name": "partVIIIServicePhone",
                                    "label": "Answering Service Phone",
                                    "dataType": "string"
                                },
                                {
                                    "name": "partVIII24hrPhone",
                                    "label": "24-hour Phone Numbers",
                                    "dataType": "string"
                                },
                                {
                                    "name": "partVIIISupervisors",
                                    "label": "List of Supervisors",
                                    "dataType": "string"
                                },
                                {
                                    "name": "partVIIIFullTimeEmployees",
                                    "label": "List of Full-time Employees",
                                    "dataType": "string"
                                },
                                {
                                    "name": "partVIIIEstimatedDays",
                                    "label": "3. Estimate the number of days in the past year that your company was operating out of state:",
                                    "dataType": "int",
                                    "tooltip": "Estimate the number of days in the past year that your company was operating out of state"
                                },
                                {
                                    "name": "partVIIISpillCleanUpText",
                                    "defaultValue": "[{\"children\": [{\"text\":\"4a. Spill Clean-Up Contractor Minimum Equipment List, Training and Certification\", \"bold\":true}]}]",
                                    "dataType": "rtftext",
                                    "fullWidth": true
                                },
                                {
                                    "name": "partVIIISpillCleanUp",
                                    "dataType": "paragraph",
                                    "fields": [
                                        {
                                            "name": "partVIIISpillCleanUpNotice",
                                            "defaultValue": "[{\"children\": [{\"text\": \"All of the equipment on the following list is required for those companies applying for a spill-cleanup contractor permit from the Connecticut Department of Energy and Environmental Protection. Any deviation from this ‘Minimum Equipment List” should be denoted in the space provided at the end of this list. The Department considers this list as the minimum acceptable equipment required for a spill cleanup contractor. The information contained herein is to be used for permitting purposes. Applicants should use this list only as a guideline for obtaining a permit to perform clean-up activities in response to minor to moderately sized petroleum releases.\"}, {\"text\": \"This list does not include equipment necessary to respond to a chemical or substantial petroleum release \", \"bold\":true, \"italic\":true},{\"text\": \"and should not be considered a comprehensive list in itself. There are many additional equipment items that may be necessary for a spill cleanup contractors to carry out routine spill response work in a safe and effective manner.\"}]}]",
                                            "dataType": "rtftext",
                                            "fullWidth": true
                                        },
                                        {
                                            "name": "partVIIISpillRequirementNotice",
                                            "defaultValue": "Check each box as verification that each requirement has been met.",
                                            "dataType": "rtftext",
                                            "fullWidth": true
                                        },
                                        {
                                            "name": "partVIIISection1",
                                            "label": "Section 1 - Containment Equipment",
                                            "dataType": "paragraph",
                                            "fields": [
                                                {
                                                    "name": "section1OptionA",
                                                    "label": "A. 250 feet of skirted containment or hard boom with 4 inch freeboard",
                                                    "dataType": "checkbox"
                                                },
                                                {
                                                    "name": "section1OptionB",
                                                    "label": "B. 40 bales of sorbent pads",
                                                    "dataType": "checkbox"
                                                },
                                                {
                                                    "name": "section1OptionC",
                                                    "label": "C. 20 bales of sorbent boom",
                                                    "dataType": "checkbox"
                                                },
                                                {
                                                    "name": "section1OptionD",
                                                    "label": "D. 40 bags of \"speedi-dri\" or equivalent absorbent material",
                                                    "dataType": "checkbox"
                                                },
                                                {
                                                    "name": "section1OptionE",
                                                    "label": "E. Plug and patch equipment",
                                                    "dataType": "checkbox"
                                                }
                                            ]
                                        },
                                        {
                                            "name": "partVIIISection2",
                                            "label": "Section 2 - Boats",
                                            "dataType": "paragraph",
                                            "fields": [
                                                {
                                                    "name": "Section2OptionA",
                                                    "label": "A. Minimum boat length is 14 feet and suitable to maneuver a boom",
                                                    "dataType": "checkbox"
                                                },
                                                {
                                                    "name": "Section2OptionB",
                                                    "label": "B. Minimum boat engine size is 15 HSP",
                                                    "dataType": "checkbox"
                                                },
                                                {
                                                    "name": "Section2OptionC",
                                                    "label": "C. Personal floatation devices (PFDs) for each responder",
                                                    "dataType": "checkbox"
                                                },
                                                {
                                                    "name": "Section2OptionD",
                                                    "label": "D. Foul weather \"Mustang type floatation suit\" for each responder",
                                                    "dataType": "checkbox"
                                                }
                                            ]
                                        },
                                        {
                                            "name": "partVIIISection3",
                                            "label": "Section 3 - Removal Equipment",
                                            "dataType": "paragraph",
                                            "fields": [
                                                {
                                                    "name": "Section3OptionA",
                                                    "label": "A. Vacuum truck with minimum tank capacity of 3000 gallons",
                                                    "dataType": "checkbox"
                                                },
                                                {
                                                    "name": "Section3OptionB",
                                                    "label": "B. 200 feet of 2 inch vacuum hose with \"ever-titer style\" connectors",
                                                    "dataType": "checkbox"
                                                },
                                                {
                                                    "name": "Section3OptionC",
                                                    "label": "C. Assorted couplings, reducers, and adapter fittings for above hose",
                                                    "dataType": "checkbox"
                                                },
                                                {
                                                    "name": "Section3OptionD",
                                                    "label": "D. 20 55-gallon \"DOT 55H\" drums",
                                                    "dataType": "checkbox"
                                                },
                                                {
                                                    "name": "Section3OptionE",
                                                    "label": "E. 5 85-gallon over pack drums any type",
                                                    "dataType": "checkbox"
                                                },
                                                {
                                                    "name": "Section3OptionF",
                                                    "label": "F. Hand tools (brooms and shovels)",
                                                    "dataType": "checkbox"
                                                },
                                                {
                                                    "name": "Section3OptionG",
                                                    "label": "G. Sampling equipment (bailers, sample containers and labels)",
                                                    "dataType": "checkbox"
                                                }
                                            ]
                                        },
                                        {
                                            "name": "partVIIISection4",
                                            "label": "Section 4 - Personal Protective Equipment",
                                            "dataType": "paragraph",
                                            "fields": [
                                                {
                                                    "name": "Section4OptionA",
                                                    "label": "A. FPA/OSHA approved helmets with face shield (for each responder)",
                                                    "dataType": "checkbox"
                                                },
                                                {
                                                    "name": "Section4OptionB",
                                                    "label": "B. NFPA/OSHA approved bunker coat and pants (for each responder)",
                                                    "dataType": "checkbox"
                                                },
                                                {
                                                    "name": "Section4OptionC",
                                                    "label": "C. NFPA/OSHA approved steel toe fire boots (for each responder)",
                                                    "dataType": "checkbox"
                                                },
                                                {
                                                    "name": "Section4OptionD",
                                                    "label": "D. NFPA/OSHA approved fire fighting gloves (for each responder)",
                                                    "dataType": "checkbox"
                                                },
                                                {
                                                    "name": "Section4OptionE",
                                                    "label": "E. NFPA/OSHA approved Nomex hood (for each responder)",
                                                    "dataType": "checkbox"
                                                },
                                                {
                                                    "name": "Section4OptionF",
                                                    "label": "F. Tyvek or Equivalent disposable outer wear (min. 6 cases)",
                                                    "dataType": "checkbox"
                                                },
                                                {
                                                    "name": "Section4OptionG",
                                                    "label": "G. Saranex or equivalent disposable outer wear (min. 6 cases)",
                                                    "dataType": "checkbox"
                                                },
                                                {
                                                    "name": "Section4OptionH",
                                                    "label": "H. Disposable rubber over boots (min. 6 cases)",
                                                    "dataType": "checkbox"
                                                },
                                                {
                                                    "name": "Section4OptionI",
                                                    "label": "I. Approved hardhats, shoes, eye protection and safety vests are available for all response personnel",
                                                    "dataType": "checkbox"
                                                },
                                                {
                                                    "name": "Section4OptionJ",
                                                    "label": "J. LEL / 02 METER for use on highway accident scenes",
                                                    "dataType": "checkbox"
                                                },
                                                {
                                                    "name": "Section4OptionK",
                                                    "label": "K. Vehicle grounding capability",
                                                    "dataType": "checkbox"
                                                },
                                                {
                                                    "name": "Section4OptionL",
                                                    "label": "L. Self Contained Breathing Apparatus (SCBAs) (minimum of 4)",
                                                    "dataType": "checkbox"
                                                },
                                                {
                                                    "name": "Section4OptionM",
                                                    "label": "M. Respirators with appropriate cartridges (minimum of 4)",
                                                    "dataType": "checkbox"
                                                }
                                            ]
                                        },
                                        {
                                            "name": "partVIIISection5",
                                            "label": "Section 5 - Training and Certification",
                                            "dataType": "paragraph",
                                            "fields": [
                                                {
                                                    "name": "Section5OptionA",
                                                    "label": "A. All Responders trained in all aspects of Title 29 CFR 1910.120, including (L)(1) Emergency response; (L)(3) Off-site emergency response-training; (L)(5) Post-emergency response operations",
                                                    "dataType": "checkbox"
                                                },
                                                {
                                                    "name": "Section5OptionB",
                                                    "label": "B. All Responders trained to Hazardous Materials Technician level",
                                                    "dataType": "checkbox"
                                                },
                                                {
                                                    "name": "Section5OptionC",
                                                    "label": "C. All Responders are trained in Incident Command System",
                                                    "dataType": "checkbox"
                                                },
                                                {
                                                    "name": "Section5OptionD",
                                                    "label": "D. All Responders have identification showing training certification",
                                                    "dataType": "checkbox"
                                                },
                                                {
                                                    "name": "Section5OptionE",
                                                    "label": "E. All Responders participate in a Health Monitoring Program",
                                                    "dataType": "checkbox"
                                                }
                                            ]
                                        },
                                        {
                                            "name": "partVIIISection6",
                                            "label": "Section 6 - Communications Equipment / Safety",
                                            "dataType": "paragraph",
                                            "fields": [
                                                {
                                                    "name": "Section6OptionA",
                                                    "label": "A. One handheld or mobile radio per vehicle",
                                                    "dataType": "checkbox"
                                                },
                                                {
                                                    "name": "Section6OptionB",
                                                    "label": "B. Cellular phones systems maybe substituted for A",
                                                    "dataType": "checkbox"
                                                },
                                                {
                                                    "name": "Section6OptionC",
                                                    "label": "C. All communications equipment will be intrinsically safe",
                                                    "dataType": "checkbox"
                                                },
                                                {
                                                    "name": "Section6OptionD",
                                                    "label": "D. All response vehicle are equipped with \"yellow flashing\" safety lights",
                                                    "dataType": "checkbox"
                                                }
                                            ]
                                        },
                                        {
                                            "name": "partVIIISection7",
                                            "label": "Section 7 - Manpower / Special",
                                            "dataType": "paragraph",
                                            "fields": [
                                                {
                                                    "name": "Section7OptionA",
                                                    "label": "A. A minimum of four properly trained responders",
                                                    "dataType": "checkbox"
                                                },
                                                {
                                                    "name": "Section7OptionB",
                                                    "label": "B. Phone communication capability 24 hours/day",
                                                    "dataType": "checkbox"
                                                },
                                                {
                                                    "name": "Section7OptionC",
                                                    "label": "C. All Responders can be reached 24 hours/day",
                                                    "dataType": "checkbox"
                                                }
                                            ]
                                        },
                                        {
                                            "name": "partVIIISection8",
                                            "label": "Section 8 - Insurance",
                                            "dataType": "paragraph",
                                            "fields": [
                                                {
                                                    "name": "Section8Option",
                                                    "label": "Company has sufficient insurance coverage as dictated by industry standard",
                                                    "dataType": "checkbox"
                                                }
                                            ]
                                        },
                                        {
                                            "name": "partVIIISpillComments",
                                            "label": "Provide comments if needed concerning the required minimum equipment list.",
                                            "dataType": "string"
                                        }
                                    ]
                                },
                                {
                                    "name": "partVIIIAdditionalSpillText",
                                    "defaultValue": "[{\"children\": [{\"text\":\"4b. Additional Spill Response Equipment\", \"bold\":true}]}]",
                                    "dataType": "rtftext",
                                    "fullWidth": true
                                },
                                {
                                    "name": "partVIIIAdditionalSpill",
                                    "dataType": "paragraph",
                                    "fields": [
                                        {
                                            "name": "partVIIIAdditionalSpillNotice",
                                            "defaultValue": "Please list and provide the requested information below for each additional piece of equipment. All equipment must be currently owned by the applicant.",
                                            "dataType": "rtftext",
                                            "fullWidth": true
                                        },
                                        {
                                            "name": "partVIIIContainmentEquipment",
                                            "defaultValue": "[{\"children\": [{\"text\": \"a. Containment Equipment\", \"bold\":true}]}]",
                                            "dataType": "rtftext",
                                            "fullWidth": true
                                        },
                                        {
                                            "name": "partVIIIContainmentTable",
                                            "dataType": "table",
                                            "multiValue": true,
                                            "fullWidth": true,
                                            "fieldset": {
                                                "fields": [
                                                    {
                                                        "name": "partVIIIContainmentBarriers",
                                                        "label": "Floating Barriers",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIIContainmentModel",
                                                        "label": "Make/model",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIIContainmentDiameter",
                                                        "label": "Flotation Collar Diameter",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIIContainmentSectionLength",
                                                        "label": "Length of section",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIIContainmentSkirtLength",
                                                        "label": "Skirt length",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIIContainmentTotalLength",
                                                        "label": "Total Length",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            "name": "partVIIIContainmentTable1",
                                            "dataType": "table",
                                            "multiValue": true,
                                            "fullWidth": true,
                                            "fieldset": {
                                                "fields": [
                                                    {
                                                        "name": "partVIIIContainmentBoats1",
                                                        "label": "Boats",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIIContainmentModel1",
                                                        "label": "Make/model",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIIContainmentLength1",
                                                        "label": "Length",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            "name": "partVIIIContainmentTable2",
                                            "dataType": "table",
                                            "multiValue": true,
                                            "fullWidth": true,
                                            "fieldset": {
                                                "fields": [
                                                    {
                                                        "name": "partVIIIContainmentMotors2",
                                                        "label": "Motors",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIIContainmentModel2",
                                                        "label": "Make/model",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIIContainmentHorsepower2",
                                                        "label": "Horsepower",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            "name": "partVIIIRemovalEquipment",
                                            "defaultValue": "[{\"children\": [{\"text\": \"b. Removal Equipment\", \"bold\":true}]}]",
                                            "dataType": "rtftext",
                                            "fullWidth": true
                                        },
                                        {
                                            "name": "partVIIIRemovalTable",
                                            "dataType": "table",
                                            "multiValue": true,
                                            "fullWidth": true,
                                            "fieldset": {
                                                "fields": [
                                                    {
                                                        "name": "partVIIIRemovalSkimmers",
                                                        "label": "Skimmers",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIIRemovalKind",
                                                        "label": "Kind",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIIRemovalSize",
                                                        "label": "Size",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIIRemovalHP",
                                                        "label": "H.P.",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIIRemovalNumber",
                                                        "label": "No.",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            "name": "partVIIIRemovalTable1",
                                            "dataType": "table",
                                            "multiValue": true,
                                            "fullWidth": true,
                                            "fieldset": {
                                                "fields": [
                                                    {
                                                        "name": "partVIIIRemovalHose1",
                                                        "label": "Hose",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIIRemovalSize1",
                                                        "label": "Size",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIIRemovalLength1",
                                                        "label": "Length",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIIRemovalNumber1",
                                                        "label": "No.",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            "name": "partVIIIRemovalTable2",
                                            "dataType": "table",
                                            "multiValue": true,
                                            "fullWidth": true,
                                            "fieldset": {
                                                "fields": [
                                                    {
                                                        "name": "partVIIIRemovalAdaptors2",
                                                        "label": "Adaptors",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIIRemovalSize2",
                                                        "label": "Size",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIIRemovalNumber2",
                                                        "label": "No.",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            "name": "partVIIIRemovalTable3",
                                            "dataType": "table",
                                            "multiValue": true,
                                            "fullWidth": true,
                                            "fieldset": {
                                                "fields": [
                                                    {
                                                        "name": "partVIIIRemovalReducers3",
                                                        "label": "Reducers",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIIRemovalSize3",
                                                        "label": "Size",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIIRemovalDescription3",
                                                        "label": "Description",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIIRemovalNumber3",
                                                        "label": "No.",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            "name": "partVIIIRemovalTable4",
                                            "dataType": "table",
                                            "multiValue": true,
                                            "fullWidth": true,
                                            "fieldset": {
                                                "fields": [
                                                    {
                                                        "name": "partVIIIRemovalFittings4",
                                                        "label": "Fittings",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIIRemovalKind4",
                                                        "label": "Kind",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIIRemovalNumber4",
                                                        "label": "No.",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            "name": "partVIIIRemovalTable5",
                                            "dataType": "table",
                                            "multiValue": true,
                                            "fullWidth": true,
                                            "fieldset": {
                                                "fields": [
                                                    {
                                                        "name": "partVIIIRemovalSeperation5",
                                                        "label": "Seperation Vehicles",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIIRemovalDescription5",
                                                        "label": "Description",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            "name": "partVIIIRemovalTable6",
                                            "dataType": "table",
                                            "multiValue": true,
                                            "fullWidth": true,
                                            "fieldset": {
                                                "fields": [
                                                    {
                                                        "name": "partVIIIRemovalVaccum6",
                                                        "label": "Vaccum trucks",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIIRemovalType6",
                                                        "label": "Type",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIIRemovalTank6",
                                                        "label": "Tank Cap",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIIRemovalNumber6",
                                                        "label": "No.",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            "name": "partVIIISeperationEquipment",
                                            "defaultValue": "[{\"children\": [{\"text\": \"c. Seperation Equipment\", \"bold\":true}]}]",
                                            "dataType": "rtftext",
                                            "fullWidth": true
                                        },
                                        {
                                            "name": "partVIIISeperationTable",
                                            "dataType": "table",
                                            "multiValue": true,
                                            "fullWidth": true,
                                            "fieldset": {
                                                "fields": [
                                                    {
                                                        "name": "partVIIISeperationTrucks",
                                                        "label": "Tank Trucks",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIISeperationSize",
                                                        "label": "Size",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIISeperationNumber",
                                                        "label": "No.",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            "name": "partVIIISeperationTable1",
                                            "dataType": "table",
                                            "multiValue": true,
                                            "fullWidth": true,
                                            "fieldset": {
                                                "fields": [
                                                    {
                                                        "name": "partVIIISeperationBarge1",
                                                        "label": "Barge",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIISeperationSize1",
                                                        "label": "Size",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIISeperationNumber1",
                                                        "label": "No.",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            "name": "partVIIISeperationTable2",
                                            "dataType": "table",
                                            "multiValue": true,
                                            "fullWidth": true,
                                            "fieldset": {
                                                "fields": [
                                                    {
                                                        "name": "partVIIISeperationTanks2",
                                                        "label": "Storage Tanks",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIISeperationSize2",
                                                        "label": "Size",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIISeperationNumber2",
                                                        "label": "No.",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIISeperationLocation2",
                                                        "label": "Location",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            "name": "partVIIICleanupEquipment",
                                            "defaultValue": "[{\"children\": [{\"text\": \"d. Clean-up Equipment\", \"bold\":true}]}]",
                                            "dataType": "rtftext",
                                            "fullWidth": true
                                        },
                                        {
                                            "name": "partVIIICleanupTable",
                                            "dataType": "table",
                                            "multiValue": true,
                                            "fullWidth": true,
                                            "fieldset": {
                                                "fields": [
                                                    {
                                                        "name": "partVIIICleanupBulldozer",
                                                        "label": "Bulldozer",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIICleanupNumber",
                                                        "label": "No.",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            "name": "partVIIICleanupTable1",
                                            "dataType": "table",
                                            "multiValue": true,
                                            "fullWidth": true,
                                            "fieldset": {
                                                "fields": [
                                                    {
                                                        "name": "partVIIICleanupGrader1",
                                                        "label": "Grader",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIICleanupNumber1",
                                                        "label": "No.",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            "name": "partVIIICleanupTable2",
                                            "dataType": "table",
                                            "multiValue": true,
                                            "fullWidth": true,
                                            "fieldset": {
                                                "fields": [
                                                    {
                                                        "name": "partVIIICleanupLoader2",
                                                        "label": "Front-end Loader",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIICleanupNumber2",
                                                        "label": "No.",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            "name": "partVIIICleanupTable3",
                                            "dataType": "table",
                                            "multiValue": true,
                                            "fullWidth": true,
                                            "fieldset": {
                                                "fields": [
                                                    {
                                                        "name": "partVIIICleanupSteam3",
                                                        "label": "Steam Jenny",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    },
                                                    {
                                                        "name": "partVIIICleanupNumber3",
                                                        "label": "No.",
                                                        "dataType": "string",
                                                        "favorite": false,
                                                        "required": false,
                                                        "tooltip": ""
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                },
                                {
                                    "name": "partVIIIStorageAreas",
                                    "dataType": "paragraph",
                                    "label": "5. List of all Equipment Storage Areas",
                                    "fullWidth": true,
                                    "fields": [
                                        {
                                            "name": "partVIIIStorageAreaType1",
                                            "label": "Type",
                                            "dataType": "string",
                                            "tooltip": "Type"
                                        },
                                        {
                                            "name": "partVIIIStorageArea24hrPhone1",
                                            "label": "24-Hour Phone #",
                                            "dataType": "string",
                                            "tooltip": "24-Hour Phone #"
                                        },
                                        {
                                            "name": "partVIIIStorageAreaAddress1",
                                            "label": "Address",
                                            "dataType": "string",
                                            "tooltip": "Address"
                                        },
                                        {
                                            "name": "partVIIIStorageAreaType2",
                                            "label": "Type",
                                            "dataType": "string",
                                            "tooltip": "Type"
                                        },
                                        {
                                            "name": "partVIIIStorageArea24hrPhone2",
                                            "label": "24-Hour Phone #",
                                            "dataType": "string",
                                            "tooltip": "24-Hour Phone #"
                                        },
                                        {
                                            "name": "partVIIIStorageAreaAddress2",
                                            "label": "Address",
                                            "dataType": "string",
                                            "tooltip": "Address"
                                        },
                                        {
                                            "name": "partVIIIStorageAreaType3",
                                            "label": "Type",
                                            "dataType": "string",
                                            "tooltip": "Type"
                                        },
                                        {
                                            "name": "partVIIIStorageArea24hrPhone3",
                                            "label": "24-Hour Phone #",
                                            "dataType": "string",
                                            "tooltip": "24-Hour Phone #"
                                        },
                                        {
                                            "name": "partVIIIStorageAreaAddress3",
                                            "label": "Address",
                                            "dataType": "string",
                                            "tooltip": "Address"
                                        },
                                        {
                                            "name": "partVIIIStorageAreaType4",
                                            "label": "Type",
                                            "dataType": "string",
                                            "tooltip": "Type"
                                        },
                                        {
                                            "name": "partVIIIStorageArea24hrPhone4",
                                            "label": "24-Hour Phone #",
                                            "dataType": "string",
                                            "tooltip": "24-Hour Phone #"
                                        },
                                        {
                                            "name": "partVIIIStorageAreaAddress4",
                                            "label": "Address",
                                            "dataType": "string",
                                            "tooltip": "Address"
                                        }
                                    ]
                                },
                                {
                                    "name": "partVIIIMaintenanceAreas",
                                    "dataType": "paragraph",
                                    "label": "6. List Equipment Maintenance Areas",
                                    "fullWidth": true,
                                    "fields": [
                                        {
                                            "name": "partVIIIMaintenanceAreaType",
                                            "label": "Type",
                                            "dataType": "string",
                                            "tooltip": "Type"
                                        },
                                        {
                                            "name": "partVIIIMaintenanceArea24hrPhone",
                                            "label": "24-Hour Phone Numbers",
                                            "dataType": "string",
                                            "tooltip": "24-Hour Phone Numbers"
                                        },
                                        {
                                            "name": "partVIIIMaintenanceAreaNotice",
                                            "defaultValue": "Describe type of treatment facilities available for wastes generated from:",
                                            "dataType": "rtftext",
                                            "fullWidth": true
                                        },
                                        {
                                            "name": "partVIIIMaintenanceAreaWashing",
                                            "label": "Vehicle washing (interior and exterior):",
                                            "dataType": "string",
                                            "tooltip": "Vehicle washing (interior and exterior)"
                                        },
                                        {
                                            "name": "partVIIIMaintenanceAreaCleaning",
                                            "label": "Boom cleaning",
                                            "dataType": "string",
                                            "tooltip": "Boom cleaning"
                                        },
                                        {
                                            "name": "partVIIIMaintenanceAreaMiscellaneousCleaning",
                                            "label": "Miscellaneous equipment cleaning",
                                            "dataType": "string",
                                            "tooltip": "Miscellaneous equipment cleaning"
                                        }
                                    ]
                                },
                                {
                                    "name": "partVIIIDisposalSites",
                                    "dataType": "paragraph",
                                    "label": "7. List Equipment Maintenance Areas",
                                    "fullWidth": true,
                                    "fields": [
                                        {
                                            "name": "partVIIIPrivateSite",
                                            "label": "Private Site",
                                            "dataType": "string",
                                            "tooltip": "Private Site"
                                        },
                                        {
                                            "name": "partVIIIPublicSite",
                                            "label": "Public Site",
                                            "dataType": "string",
                                            "tooltip": "Public Site"
                                        },
                                        {
                                            "name": "partVIIIOtherSites",
                                            "label": "Other Arrangements (description)",
                                            "dataType": "string",
                                            "tooltip": "Other Arrangements (description)"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            "attachments": [
                {
                    "name": "partIXSupportingDocuments",
                    "defaultValue": "Part V: Supporting Documents",
                    "dataType": "rtftext"
                },
                {
                    "dataType": "rtftext",
                    "defaultValue": "Be sure to read the instructions (DEEP-WEED-INST-400) to determine whether the attachments listed are applicable to your specific activity. Check the applicable box below for each attachment being submitted with this application form. When submitting any supporting documents, please label the documents as indicated in this part (e.g., Attachment A, etc.) and be sure to include the applicant's name as indicated on this application form"
                },
                {
                    "name": "attachmentA",
                    "label": "Attachment A: Applicant/Owner Information (DEEP-WEED-APP-408) - REQUIRED FOR ALL APPLICATIONS",
                    "dataType": "file",
                    "variant": "droparea",
                    "required": true,
                    "multiValue": true,
                    "allowedExtensions": [
                        "pdf"
                    ],
                    "maximumSize": 10000000,
                    "tooltip": "Please attach a copy of the Applicant/Owner Information"
                },
                {
                    "name": "attachmentB",
                    "label": "Attachment B: Applicant Compliance Information Form - REQUIRED FOR ALL APPLICATIONS",
                    "dataType": "file",
                    "ui": "rtflabel",
                    "variant": "droparea",
                    "required": true,
                    "multiValue": true,
                    "allowedExtensions": [
                        "pdf"
                    ],
                    "maximumSize": 10000000,
                    "tooltip": "Please attach your application compliance information form"
                },
                {
                    "name": "attachmentBNotice",
                    "defaultValue": "[{\"children\":[{\"type\":\"link\", \"url\":\"https://portal.ct.gov/DEEP/Permits-and-Licenses/Common-Forms#ComplianceInformation\", \"children\":[{\"text\": \"Applicant Compliance Information Form\"}]},{\"text\":\" (DEEP-APP-002)\"}]}]",
                    "dataType": "rtftext"
                },
                {
                    "name": "attachmentC",
                    "label": "Attachment C: Certificate of Insurance and MCS-90 Forms - REQUIRED FOR ALL APPLICATIONS",
                    "dataType": "file",
                    "variant": "droparea",
                    "required": true,
                    "multiValue": true,
                    "allowedExtensions": [
                        "pdf"
                    ],
                    "maximumSize": 10000000,
                    "tooltip": "Please attach your certification of insurance and MCS-90 forms"
                },
                {
                    "name": "attachmentCNotice",
                    "defaultValue": "[{\"children\":[{\"text\":\"Include an original copy of the\"},{\"text\":\" Certificate of Insurance \", \"bold\": true},{\"text\": \"listing as the certificate holder: the Connecticut Department of Energy and Environmental Protection, Bureau of Materials Management and Compliance Assurance, 79 Elm Street, Hartford, CT 06106-5127.\"}]}] ",
                    "dataType": "rtftext"
                },
                {
                    "name": "attachmentCNotice2",
                    "defaultValue": "Include an MCS-90 Endorsement to the policy(ies) identified on the Certificate of Insurance to verify that the applicant has met the minimum levels of financial responsibility as required by 49 CFR Part 387, and RCSA Section 22a209(15)(g)(4) if applying for a Biomedical Waste Transporter Permit.",
                    "dataType": "rtftext"
                },
                {
                    "name": "attachmentD",
                    "label": "Attachment D: List of Transporter Permits Held in Other States (DEEP-WEED-APP-401)",
                    "dataType": "file",
                    "variant": "droparea",
                    "required": true,
                    "multiValue": true,
                    "allowedExtensions": [
                        "pdf"
                    ],
                    "maximumSize": 10000000,
                    "tooltip": "Please attach your List of transporter permits held in other states"
                },
                {
                    "name": "attachmentE1",
                    "label": "Attachment E1: List of Wastes: Non-RCRA Hazardous Waste (DEEP-WEED-APP-403)",
                    "dataType": "file",
                    "variant": "droparea",
                    "required": true,
                    "multiValue": true,
                    "hiddenCondition": "wasteTypes!=NonRCRAHazardousWaste",
                    "allowedExtensions": [
                        "pdf"
                    ],
                    "maximumSize": 10000000,
                    "tooltip": "Please attach your List of wastes: non-rcra hazardous waste"
                },
                {
                    "name": "attachmentE2",
                    "label": "Attachment E2: List of Wastes: RCRA Hazardous Waste (DEEP-WEED-APP-404)",
                    "dataType": "file",
                    "variant": "droparea",
                    "required": true,
                    "multiValue": true,
                    "hiddenCondition": "wasteTypes!=RCRAHazardousWaste",
                    "allowedExtensions": [
                        "pdf"
                    ],
                    "maximumSize": 10000000,
                    "tooltip": "Please attach your List of wastes: RCRA Hazardous Waste"
                },
                {
                    "name": "attachmentE3",
                    "label": "Attachment E3: List of Wastes: Biomedical Waste (DEEP-WEED-APP-405)",
                    "dataType": "file",
                    "variant": "droparea",
                    "required": true,
                    "multiValue": true,
                    "hiddenCondition": "wasteTypes!=BiomedicalWaste;Permit Type!=BiomedicalWasteTransporter",
                    "allowedExtensions": [
                        "pdf"
                    ],
                    "maximumSize": 10000000,
                    "tooltip": "Please attach your List of wastes: Biomedical Waste"
                },
                {
                    "name": "attachmentFNotice",
                    "defaultValue": "[{\"children\": [{\"text\":\"Attachment F is only to be completed and submitted if you are applying for Spill Clean-up Contractor Permit\", \"bold\":true, \"italic\":true}]}]",
                    "dataType": "rtftext",
                    "hiddenCondition": "hazardousWasteTransporterPricing!=oneyear,Permit Type!=HazardousWasteTransporter,optionB!=true"
                },
                {
                    "name": "attachmentF",
                    "label": "Attachment F: Spill Clean-up Contractor Application (DEEP-WEED-APP-407) ",
                    "dataType": "file",
                    "variant": "droparea",
                    "required": true,
                    "multiValue": true,
                    "hiddenCondition": "hazardousWasteTransporterPricing!=oneyear,Permit Type!=HazardousWasteTransporter,optionB!=true",
                    "allowedExtensions": [
                        "pdf"
                    ],
                    "maximumSize": 10000000,
                    "tooltip": "Please attach your spill clean-up contractor application"
                },
                {
                    "name": "attachmentFNotice1",
                    "defaultValue": "[{\"children\": [{\"text\":\"(please do not submit with Hazardous Waste or Biomedical Waste Transporter application if not applying for a Spill Clean-up Contractor Permit).\", \"bold\":true}]}]",
                    "dataType": "rtftext",
                    "hiddenCondition": "hazardousWasteTransporterPricing!=oneyear,Permit Type!=HazardousWasteTransporter,optionB!=true"
                }
            ]
        },
        "effectiveFrom": "2020-08-17",
        "effectiveTo": null,
        "_links": {
            "self": {"href": "http://192.168.0.201:9080/forms-api/1.0/config/forms/1000"},
            "create-form": {"href": "http://192.168.0.201:9080/forms-api/1.0/forms/1000"}
        }
    }
}