import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useIntakeForm } from "../../context/IntakeFormContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faCircleArrowRight,
	faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons"
import "./IntakeForms.css"

const SexForm = () => {
	const { data, updateData } = useIntakeForm()
	const [sex, setSex] = useState(data.sex || "")
	const navigate = useNavigate()

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!sex) return

		updateData({ sex })
		navigate("/weight")
	}

	const handleSexChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setSex(e.target.value)
	}

	return (
		<div className="form-wrapper">
			<form
				className="form-page"
				onSubmit={handleSubmit}
			>
				<label
					className="form-label"
					htmlFor="sex"
				>
					What is your sex?
				</label>
				<br />
				<label>
					<input
						type="radio"
						id="sex"
						name="sex"
						value="male"
						checked={sex === "male"}
						onChange={handleSexChange}
					/>
					Male
				</label>
				<br />
				<label>
					<input
						type="radio"
						id="sex"
						name="sex"
						value="female"
						checked={sex === "female"}
						onChange={handleSexChange}
					/>
					Female
				</label>
				<br />
				<br />
				<div className="arrow-btns">
					<button
						type="button"
						onClick={() => navigate("/age")}
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

export default SexForm
