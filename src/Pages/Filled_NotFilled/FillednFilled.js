import React, { useEffect, useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { DataGrid } from "@mui/x-data-grid";
import BeatLoader from "react-spinners/BeatLoader";
import "./FillednFilled.css";
import { unparse as PapaUnparse } from "papaparse";

import { Navigate, useNavigate } from "react-router-dom";

export const FillednFilled = () => {
	const navigate = useNavigate();
	const [pagedata, setPageData] = useState({});
	const [loadinf, setLoadinf] = useState(true);

	const [displayData, setDisplayData] = useState([]);
	const [loggedi, setloggedin] = useState([]);
	const [notloggedin, setnotloggedin] = useState([]);
	const [personal, setpersonal] = useState([]);
	const [personalnotfilled, setpersonalnotfilled] = useState([]);
	const [bankfilled, setbankfilled] = useState([]);
	const [banknfilled, setnbankfilled] = useState([]);
	const [coursefilled, setcoursefilled] = useState([]);
	const [ncoursefilled, setncoursefilled] = useState([]);
	const [p1freeze, setp1freeze] = useState([]);
	const [np1freeze, setnp1freeze] = useState([]);

	const [declare, setdeclared] = useState([]);
	const [notdeclared, setnotdeclared] = useState([]);
	const [docu, setdocu] = useState([]);
	const [fdocu, setfdocu] = useState([]);
	const [tfreeze, settfreeze] = useState([]);
	const [ntfreeze, setntfreeze] = useState([]);

	useEffect(() => {
		data();
	}, []);

	const downloadmaker = () => {
		console.log(np1freeze);
		const csvData = np1freeze.map((item) => ({
			// Map the item properties to match your CSV columns
			Code: item.ccode,
			CollegeName: item.can,
			Principal: item.PrincipalName,
			Email: item.Email,
			Phone: item.PhoneNumber
		}));

		console.log(csvData);
		// const Delremcsvdata = removeDuplicates(csvData, "Admission_No");

		// // Trigger the CSV download
		const csvDataString = PapaUnparse(csvData);
		const csvBlob = new Blob([csvDataString], { type: "text/csv" });
		const csvUrl = URL.createObjectURL(csvBlob);
		const link = document.createElement("a");
		link.href = csvUrl;
		link.download = `phase1notlocked.csv`;
		link.click();
		URL.revokeObjectURL(csvUrl);
	};

	const data = async () => {
		const data = await fetch("http://localhost:5555/filled")
			.then((res) => res.json())
			.then((res2) => {
				setLoadinf(false);
				console.log(res2);
				setPageData(res2.login);
				setloggedin(res2.login);
				setnotloggedin(res2.nlogin);
				setpersonal(res2.pd);
				setpersonalnotfilled(res2.npd);
				setbankfilled(res2.bd);
				setnbankfilled(res2.nbd);
				setcoursefilled(res2.cd);
				setncoursefilled(res2.ncd);
				setp1freeze(res2.p1f);
				setnp1freeze(res2.np1f);
				setdeclared(res2.dec);
				setnotdeclared(res2.ndec);
				setdocu(res2.doc);
				setfdocu(res2.ndoc);
				settfreeze(res2.p2f);
				setntfreeze(res2.np2f);
			});
	};

	const [filled, setFilled] = useState("0");
	const handleChange = (data) => {
		setFilled(data.target.value);
		console.log(data.target.value);
	};

	const columns = [
		{ field: "ccode", headerName: "Code", flex: 0.1 },
		{ field: "can", headerName: "College Name", flex: 0.4 },
		{ field: "PrincipalName", headerName: "Pricipal", flex: 0.2 },
		{ field: "Email", headerName: "Email", flex: 0.2 },
		{ field: "PhoneNumber", headerName: "Phone", flex: 0.1 }
	];

	return (
		<div className="fillednotfilledpage">
			<div>
				<ToggleButtonGroup
					color="primary"
					value={filled}
					exclusive
					onChange={handleChange}
					aria-label="Platform"
					sx={{ m: 2 }}
				>
					<ToggleButton
						value={"0"}
						onClick={() => {
							setPageData(loggedi);
						}}
					>
						Logged In
					</ToggleButton>
					<ToggleButton
						value={"1"}
						onClick={() => {
							setPageData(notloggedin);
						}}
					>
						Not Logged In
					</ToggleButton>
				</ToggleButtonGroup>
				<ToggleButtonGroup
					color="primary"
					value={filled}
					exclusive
					onChange={handleChange}
					aria-label="Platform"
					sx={{ m: 2 }}
				>
					<ToggleButton
						value={"2"}
						onClick={() => {
							setPageData(personal);
						}}
					>
						Personal Filled
					</ToggleButton>
					<ToggleButton
						value={"3"}
						onClick={() => {
							setPageData(personalnotfilled);
						}}
					>
						Personal Not Filled
					</ToggleButton>
				</ToggleButtonGroup>
				<ToggleButtonGroup
					color="primary"
					value={filled}
					exclusive
					onChange={handleChange}
					aria-label="Platform"
					sx={{ m: 2 }}
				>
					<ToggleButton
						value={"4"}
						onClick={() => {
							setPageData(bankfilled);
						}}
					>
						Bank Filled
					</ToggleButton>
					<ToggleButton
						value={"5"}
						onClick={() => {
							setPageData(banknfilled);
						}}
					>
						Bank Not Filled
					</ToggleButton>
				</ToggleButtonGroup>
				<ToggleButtonGroup
					color="primary"
					value={filled}
					exclusive
					onChange={handleChange}
					aria-label="Platform"
					sx={{ m: 2 }}
				>
					<ToggleButton
						value={"6"}
						onClick={() => {
							setPageData(coursefilled);
						}}
					>
						Course Filled
					</ToggleButton>
					<ToggleButton
						value={"7"}
						onClick={() => {
							setPageData(ncoursefilled);
						}}
					>
						Course Not Filled
					</ToggleButton>
				</ToggleButtonGroup>
				<ToggleButtonGroup
					color="primary"
					value={filled}
					exclusive
					onChange={handleChange}
					aria-label="Platform"
					sx={{ m: 2 }}
				>
					<ToggleButton
						value={"8"}
						onClick={() => {
							setPageData(p1freeze);
						}}
					>
						Phase 1 Freeze
					</ToggleButton>
					<ToggleButton
						onClick={() => {
							setPageData(np1freeze);
						}}
						value={"9"}
					>
						Not Freezed
					</ToggleButton>
				</ToggleButtonGroup>
				<ToggleButtonGroup
					color="primary"
					value={filled}
					exclusive
					onChange={handleChange}
					aria-label="Platform"
					sx={{ m: 2 }}
				>
					<ToggleButton
						value={"10"}
						onClick={() => {
							setPageData(declare);
						}}
					>
						Declared
					</ToggleButton>
					<ToggleButton
						value={"11"}
						onClick={() => {
							setPageData(notdeclared);
						}}
					>
						Not Declared
					</ToggleButton>
				</ToggleButtonGroup>
				<ToggleButtonGroup
					color="primary"
					value={filled}
					exclusive
					onChange={handleChange}
					aria-label="Platform"
					sx={{ m: 2 }}
				>
					<ToggleButton
						value={"12"}
						onClick={() => {
							setPageData(docu);
						}}
					>
						Document uploaded
					</ToggleButton>
					<ToggleButton
						value={"13"}
						onClick={() => {
							setPageData(fdocu);
						}}
					>
						Not Uploaded
					</ToggleButton>
				</ToggleButtonGroup>
				<ToggleButtonGroup
					color="primary"
					value={filled}
					exclusive
					onChange={handleChange}
					aria-label="Platform"
					sx={{ m: 2 }}
				>
					<ToggleButton
						value={"14"}
						onClick={() => {
							setPageData(tfreeze);
						}}
					>
						Total Freeze
					</ToggleButton>
					<ToggleButton
						value={"15"}
						onClick={() => {
							setPageData(ntfreeze);
						}}
					>
						Not Freeze
					</ToggleButton>
				</ToggleButtonGroup>
				<button
					onClick={() => {
						downloadmaker();
					}}
				>
					Download Not Freezed
				</button>
			</div>

			<div style={{ height: "100vh", width: "100%" }} className="tablediv">
				{loadinf ? (
					<div
						style={{
							width: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							marginTop: "100px"
						}}
					>
						<BeatLoader color="indigo" />
					</div>
				) : (
					<DataGrid
						rows={pagedata}
						columns={columns}
						pageSize={5}
						rowHeight={80}
						rowsPerPageOptions={[5]}
						hideFooter={true}
						style={{ backgroundColor: "white" }}
						getRowId={(row) => row._id}
						onRowClick={(row) => {
							console.log(row);
							navigate(`college/${row.row.ccode}`);
						}}
					/>
				)}
			</div>
		</div>
	);
};
