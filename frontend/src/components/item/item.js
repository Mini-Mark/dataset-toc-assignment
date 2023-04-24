import "./item.scss";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";

export default class Item extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			show_detail: false,
		};
	}

	render() {
		const toggleClass = () => {
			const currentState = this.state.show_detail;
			this.setState({ show_detail: !currentState });
		};

		const handleDownload = () => {
			fetch("/assets/csv/" + this.props.province_name + ".csv", {
				headers: {
					"Content-Type": "text/csv",
				},
			})
				.then((response) => response.blob())
				.then((blob) => {
					const url = window.URL.createObjectURL(blob);
					const a = document.createElement("a");
					a.href = url;
					a.download = this.props.province_name + ".csv";
					a.click();
				});
		};

		return (
			<div
				className={
					this.state.show_detail ? "container show" : "container"
				}
			>
				<div className="item">
					<div class="title">
						{this.props.province_name} (
						{this.props.province_data.length})
					</div>
					<div class="action">
						<FontAwesomeIcon
							icon={faFileArrowDown}
							className="download"
							onClick={handleDownload}
						/>
						<FontAwesomeIcon
							icon={faTimes}
							className="delete"
							onClick={() =>
								this.props.searchFunc(this.props.province_name)
							}
						/>
						<div class="last" onClick={toggleClass}>
							<FontAwesomeIcon icon={faCaretUp} />
						</div>
					</div>
				</div>
				<div class="more-detail">
					{this.props.province_data.map((item, index) => (
						<p key={index}>{item}</p>
					))}
				</div>
			</div>
		);
	}
}
