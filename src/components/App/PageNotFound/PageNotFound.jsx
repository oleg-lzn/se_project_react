import "./PageNotFound.css";
import { Link } from "react-router-dom";
import not_found_cat from "../../../assets/images/not_found_cat.jpeg";

function PageNotFound() {
  return (
    <div className="not-found">
      <h3 className="not-found__title">
        <span>404</span> - Page Not Found!
      </h3>
      <img
        src={not_found_cat}
        alt="not found image"
        className="not-found__image"
      />
      <p className="not-found__text">
        Uh Oh! There&apos;s nothing here... Sorry 🥺
      </p>
      <Link to="/se_project_react/" className="not-found__link">
        Back to the Main Page
      </Link>
    </div>
  );
}

export default PageNotFound;
