import "./App.scss";
import Search from "./components/search/search";
import Item from "./components/item/item";
import React, { useState } from "react";

function App() {
	const [provinceList, setProvinces] = useState([]);

	async function checkDataIsFound(pv) {
		const response = await fetch(
			"https://toc-dataset-backend.onrender.com/temples/" + pv
		);
		const data = await response.json();
		if (data["Temples"] === "Error" || data.length === 0) {
			return false;
		} else {
			return data["Temples"];
		}
	}

	async function toggleSearch(pv, disableRemove = false) {
		const provinceIndex = provinceList.findIndex(
			(province) => province.name === pv
		);
		if (provinceIndex === -1) {
			const data_check = await checkDataIsFound(pv);
			if (data_check) {
				setProvinces([...provinceList, { name: pv, data: data_check }]);
			} else {
				alert("ไม่พบจังหวัดที่ระบุ");
			}
		} else {
			if (!disableRemove) {
				const updatedProvinceList = provinceList.filter(
					(province) => province.name !== pv
				);
				setProvinces(updatedProvinceList);
			}
		}
	}

	const handleDownloadSuggest = () => {
		fetch("/assets/csv/จังหวัดที่แนะนำ.csv", {
			headers: {
				"Content-Type": "text/csv",
			},
		})
			.then((response) => response.blob())
			.then((blob) => {
				const url = window.URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.href = url;
				a.download = "จังหวัดที่แนะนำ.csv";
				a.click();
			});
	};

	const handleDownloadAllShow = () => {
		provinceList.forEach((province) => {
			fetch("/assets/csv/" + province.name + ".csv", {
				headers: {
					"Content-Type": "text/csv",
				},
			})
				.then((response) => response.blob())
				.then((blob) => {
					const url = window.URL.createObjectURL(blob);
					const a = document.createElement("a");
					a.href = url;
					a.download = province.name + ".csv";
					a.click();
				});
		});
	};

	const handleDivClick_Paper = () => {
		window.open(
			"https://drive.google.com/file/d/1HzbURcBGOqhqkFC2_scYFXjF6qhLCZWW/view?usp=sharing",
			"_blank"
		);
	};

	const handleDivClick_Github = () => {
		window.open(
			"https://github.com/Mini-Mark/dataset-toc-assignment.git",
			"_blank"
		);
	};

	return (
		<div className="App">
			<Search searchFunc={toggleSearch} provinceList={provinceList} />
			<div class="container-app">
				<div class="github" onClick={handleDivClick_Github}></div>
				<div class="paper" onClick={handleDivClick_Paper}></div>

				<div class="board">
					<div class="more-action">
						<div
							class="download-show"
							onClick={handleDownloadAllShow}
						>
							ดาวน์โหลดจังหวัดที่แสดง
						</div>
						<div class="more-link">
							<div
								class="github"
								onClick={handleDivClick_Github}
							></div>
							<div
								class="paper"
								onClick={handleDivClick_Paper}
							></div>
						</div>
						<div
							class="download-all"
							onClick={handleDownloadSuggest}
						>
							ดาวน์โหลดจังหวัดที่แนะนำ
						</div>
					</div>
					{provinceList.map((province, index) => (
						<Item
							province_name={province.name}
							province_data={province.data}
							searchFunc={toggleSearch}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
