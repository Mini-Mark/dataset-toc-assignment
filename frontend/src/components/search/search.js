import "./search.scss";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default class Search extends React.Component {
	render() {
		const checkboxChange = (province) => {
			console.log(this.props.provinceList);
			this.props.searchFunc(province);
		};

		const inputData_KeyDown = (event) => {
			if (event.key === "Enter") {
				this.props.searchFunc(event.target.value, true);
			}
		};

		const inputData_Btn = (event) => {
			this.props.searchFunc(
				document.getElementById("search-box").value,
				true
			);
		};

		return (
			<div class="content">
				<div class="title">DATA SET</div>
				<div class="desc">ค้นหาจังหวัดที่คุณต้องการ</div>
				<div class="input">
					<input
						id="search-box"
						type="text"
						placeholder="จังหวัด..."
						onKeyDown={inputData_KeyDown}
					/>
					<div class="search-btn" onClick={inputData_Btn}>
						<FontAwesomeIcon icon={faSearch} />
					</div>
				</div>
				<div class="checkbox-list">
					<div class="c-item">
						<input
							type="checkbox"
							value="สตูล"
							onChange={() => checkboxChange("สตูล")}
							checked={
								!!this.props.provinceList?.find(
									(p) => p.name === "สตูล"
								)
							}
						/>{" "}
						สตูล
					</div>
					<div class="c-item">
						<input
							type="checkbox"
							value="สมุทรปราการ"
							onChange={() => checkboxChange("สมุทรปราการ")}
							checked={
								!!this.props.provinceList?.find(
									(p) => p.name === "สมุทรปราการ"
								)
							}
						/>{" "}
						สมุทรปราการ
					</div>
					<div class="c-item">
						<input
							type="checkbox"
							value="สมุทรสงคราม"
							onChange={() => checkboxChange("สมุทรสงคราม")}
							checked={
								!!this.props.provinceList?.find(
									(p) => p.name === "สมุทรสงคราม"
								)
							}
						/>{" "}
						สมุทรสงคราม
					</div>
					<div class="c-item">
						<input
							type="checkbox"
							value="สมุทรสาคร"
							onChange={() => checkboxChange("สมุทรสาคร")}
							checked={
								!!this.props.provinceList?.find(
									(p) => p.name === "สมุทรสาคร"
								)
							}
						/>{" "}
						สมุทรสาคร
					</div>
					<div class="c-item">
						<input
							type="checkbox"
							value="สระแก้ว"
							onChange={() => checkboxChange("สระแก้ว")}
							checked={
								!!this.props.provinceList?.find(
									(p) => p.name === "สระแก้ว"
								)
							}
						/>{" "}
						สระแก้ว
					</div>
				</div>
			</div>
		);
	}
}
