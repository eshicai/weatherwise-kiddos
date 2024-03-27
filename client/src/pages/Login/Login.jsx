import { Header } from "../../components/Header/Header";
import Google from "../../assets/icons/google_plus_icon.svg";
import Facebook from "../../assets/icons/facebook_icon.svg";
import Github from "../../assets/icons/github_icon.svg";
import './Login.scss'

export const Login = ({ user }) => {
  return (
    <div>
      <Header user={user} />
      <div className="login">
        <h1 className="loginTitle">Choose a Login Method</h1>
        <div className="wrapper">
          <div className="left">
            <div className="loginButton google">
              <img src={Google} alt="" className="icon" />
              Google
            </div>
            <div className="loginButton facebook">
              <img src={Facebook} alt="" className="icon" />
              Facebook
            </div>
            <div className="loginButton github">
              <img src={Github} alt="" className="icon" />
              Github
            </div>
          </div>
          <div className="center">
            <div className="line" />
            <div className="or">OR</div>
          </div>
          <div className="right">
            <input type="text" placeholder="Username" />
            <input type="text" placeholder="Password" />
            <button className="submit">Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}