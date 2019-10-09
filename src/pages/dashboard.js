import React, { Component, PropTypes } from "react";
import { ENDPOINTS } from "../config";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  async componentDidMount() {
    let idObject = await this.getId();
    let globalContent = await this.getGlobalContent(idObject.globalGroupId, "global-web-content");
    let domainContent = await this.getDomainContent(idObject.domainGroupId, "domain-contact");
    document.getElementById("global-content").innerHTML = globalContent.content;
    document.getElementById("domain-content").innerHTML = domainContent.content || "";
  }

  getDomainContent(id, article) {
    return new Promise((res, rej) => {
      let access_token = "Basic dGVzdEBsaWZlcmF5LmNvbTp0ZXN0";
      fetch(ENDPOINTS.base + "/o/webcontent/v1.0/getContentByName", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: access_token
        },
        body: JSON.stringify({
          groupId: id,
          articleName: article
        })
      })
        .then(response => response.json())
        .then(data => {
          res(data);
        })
        .catch(err => {
          rej(err);
        });
    });
  }

  getGlobalContent(id, article) {
    return new Promise((res, rej) => {
      let access_token = "Basic dGVzdEBsaWZlcmF5LmNvbTp0ZXN0";
      fetch(ENDPOINTS.base + "/o/webcontent/v1.0/getContentByName", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: access_token
        },
        body: JSON.stringify({
          groupId: id,
          articleName: article
        })
      })
        .then(response => response.json())
        .then(data => {
          res(data);
        })
        .catch(err => {
          rej(err);
        });
    });
  }

  getId = async () => {
    return new Promise((res, rej) => {
      let hostnameString = document.location.hostname.match(/\.(.*?)\.co/i);
      let hostname = hostnameString
        ? hostnameString[1]
        : document.location.hostname;
      fetch(ENDPOINTS.base + "/o/instance/v1.0/get/" + hostname, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          res(data);
        })
        .catch(err => {
          rej(err);
        });
    });
  };

  logout = () => {
    localStorage.setItem("access_token", null);
    this.props.history.push(`/`);
  };

  render() {
    let imagePath =
      window.location.href.search("emerge") == -1
        ? "https://d1ic4altzx8ueg.cloudfront.net/niche-builder/5c8299df36bc4.png"
        : "https://quote.emergencyassistltd.co.uk/assets/imgs/Logo-trans.png";

    let var1 = "<div>hello</div>";
    return (
      <div>
        <header>
          <div className="header-container">
            <img className="header-logo" src={imagePath}></img>
            <a
              onClick={this.logout}
              className="links"
              style={{ color: "blue", paddingTop: "13px" }}
            >
              Log out
            </a>
          </div>
        </header>
        <div className="content-ctnr">
          <div className="global-content-ctnr">
            <h3>This is Global Cotent</h3>
            <div id="global-content"></div>
          </div>
          <div className="domain-content-ctnr">
            <h3>This is Domain Cotent</h3>
            <div id="domain-content"></div>
          </div>
        </div>
        <footer>
          <div className="footer-ctnr">
            <p className="footer-text">Copyright 2019</p>
          </div>
        </footer>
      </div>
    );
  }
}
export default Dashboard;
