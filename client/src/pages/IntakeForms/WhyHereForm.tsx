import { useState, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useIntakeForm } from "../../context/IntakeFormContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faCircleArrowRight,
	faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons"
import "./IntakeForms.css"

const WhyHereForm = () => {
	const { data, updateData } = useIntakeForm()
	const [whyHere, setWhyHere] = useState(data.whyHere || "")
	const navigate = useNavigate()

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		// what is FormEvent/HTMLFormElement?
		e.preventDefault()
		if (!whyHere) return

		updateData({ whyHere: whyHere })
		navigate("/goal")
	}

	const handleWhyHereChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		// what is React.ChangeEvent<HTMLInputElement>?
		setWhyHere(e.target.value)
	}

	return (
		<div className="form-wrapper">
			<form
				className="form-page"
				onSubmit={handleSubmit}
			>
				<label
					className="form-label"
					htmlFor="whyHere"
				>
					Why are you here?
				</label>
				<br />
				<label>
					<input
						id="whyHere"
						type="radio"
						name="whyHere"
						value="Build a solid workout routine that helps me feel the difference"
						checked={
							whyHere ===
							"Build a solid workout routine that helps me feel the difference"
						}
						onChange={handleWhyHereChange}
					/>
					Build a solid workout routine that helps me feel the
					difference
				</label>
				<br />
				<label>
					<input
						id="whyHere"
						type="radio"
						name="whyHere"
						value="Long-term accountability on my fitness journey"
						checked={
							whyHere ===
							"Long-term accountability on my fitness journey"
						}
						onChange={handleWhyHereChange}
					/>
					Long-term accountability on my fitness journey
				</label>
				<br />
				<label>
					<input
						id="whyHere"
						type="radio"
						name="whyHere"
						value="Personalized workout routine made for me without the hassle of planning"
						checked={
							whyHere ===
							"Personalized workout routine made for me without the hassle of planning"
						}
						onChange={handleWhyHereChange}
					/>
					Personalized workout routine made for me without the hassle
					of planning
				</label>
				{/* <br />
            <label>
				<input
					type="radio"
					name="whyHere"
					value="reason4"
					checked={whyHere === "reason4"}
					onChange={handleWhyHereChange}
				/>
				reason 4
			</label> */}
				<br />
				<div className="arrow-btns">
					<button
						type="button"
						onClick={() => navigate("/weight")}
					>
						<FontAwesomeIcon
							icon={faCircleArrowLeft}
							style={{ fontSize: "36px", color: "#333" }}
						/>
					</button>
					<button type="submit">
						<FontAwesomeIcon
							icon={faCircleArrowRight}
							style={{ fontSize: "36px", color: "#333" }}
						/>
					</button>
				</div>
			</form>
		</div>
	)
}

export default WhyHereForm
