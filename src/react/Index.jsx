import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FormattedMessage, FormattedHTMLMessage, injectIntl } from "react-intl";
import Radium from "radium";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";

import SlideToggle from "./SlideToggle.jsx";

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listAnchorEl: null,
      langAnchorEl: null,
      snackbarOpen: false,
      gsvId: null,
      gsvName: ""
    };
  }

  componentDidMount() {
    const gsvId = localStorage.getItem("gsvId");
    const gsvName = localStorage.getItem("gsvName");
    if (gsvId) {
      this.setState({
        snackbarOpen: true,
        gsvId,
        gsvName
      });
    }
  }

  handleMenuButtonClick = id => event => {
    this.setState({
      [`${id}AnchorEl`]: event.currentTarget
    });
  };

  handleMenuClose = id => () => {
    this.setState({
      [`${id}AnchorEl`]: null
    });
  };

  handleSnackbarClose = () => {
    this.setState({
      snackbarOpen: false
    });
  };

  render() {
    const {
      intl: { formatMessage },
      match: {
        params: { locale }
      }
    } = this.props;

    return (
      <div style={styles.indexPage}>
        <Helmet>
          <link rel="canonical" href={`http://gsv.fun/${locale}`} />
          <title>{formatMessage({ id: "title" })}</title>
          <meta
            name="description"
            content={`${formatMessage({ id: "intro.desc" })} ${formatMessage({
              id: "desc.3rd"
            }).substring(2)}`}
          />
        </Helmet>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.snackbarOpen}
          action={
            <div>
              <a href={`/exchain/${this.state.gsvId}/g`}>
                <Button color="secondary" size="small">
                  <FormattedMessage id="snackbar.yes" />
                </Button>
              </a>
              <Button
                color="secondary"
                size="small"
                onClick={this.handleSnackbarClose}
              >
                <FormattedMessage id="snackbar.no" />
              </Button>
            </div>
          }
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <span id="message-id">
              <FormattedMessage
                id="snackbar.message"
                values={{ name: this.state.gsvName }}
              />
            </span>
          }
        />
        <SlideToggle
          defaultOpen={true}
          title={<FormattedMessage id="intro.title" />}
        >
          <p>{<FormattedMessage id="intro.desc" />}</p>
          <h3>{<FormattedMessage id="intro.info.title" />}</h3>
          <FormattedHTMLMessage id="intro.info.content" />
        </SlideToggle>
        <SlideToggle title={<FormattedMessage id="how.title" />}>
          <p>{<FormattedMessage id="how.upload.step1.desc" />}</p>
          <p style={{ fontSize: 14 }}>
            {<FormattedMessage id="how.upload.step1.remark" />}
          </p>
          <p> For GITADORA EXCHAIN </p>
          <div style={styles.script}>
            {
              "javascript:void(!function(d){var s=d.createElement('script');s.type='text/javascript';s.src='//gitadora-skill-viewer.herokuapp.com/js/uploaddata_exchain.js';d.head.appendChild(s);}(document));"
            }
          </div>
          <p> For GITADORA Matixx </p>
          <div style={styles.script}>
            {
              "javascript:void(!function(d){var s=d.createElement('script');s.type='text/javascript';s.src='//gitadora-skill-viewer.herokuapp.com/js/uploaddata_matixx.js';d.head.appendChild(s);}(document));"
            }
          </div>
          <div
            style={{
              marginTop: 20,
              ...styles.imageContainer
            }}
          >
            <img src="/image/1-1.jpg" />
            <b style={{ position: "absolute", left: 118, top: 61 }}>
              <FormattedHTMLMessage id="how.upload.step1.imgDesc1" />
            </b>
            <b
              style={{
                position: "absolute",
                left: 65,
                top: 131,
                backgroundColor: "#FFFFFF"
              }}
            >
              <FormattedHTMLMessage id="how.upload.step1.imgDesc2" />
            </b>
          </div>
          <p>
            <FormattedHTMLMessage id="how.upload.step2.desc" />
          </p>
          <div style={styles.imageContainer}>
            <img src="/image/1-2.jpg" />
            <b
              style={{
                position: "absolute",
                left: 298,
                top: 66
              }}
            >
              <FormattedHTMLMessage id="how.upload.step2.imgDesc1" />
            </b>
            <b style={{ position: "absolute", left: 116, top: 106 }}>
              <FormattedHTMLMessage id="how.upload.step2.imgDesc2" />
            </b>
          </div>
          <p>
            <FormattedHTMLMessage id="how.upload.step3.desc" />
          </p>
          <div style={styles.imageContainer}>
            <img src="/image/1-3.jpg" />
            <b style={{ position: "absolute", left: 284, top: 70 }}>
              <FormattedHTMLMessage id="how.upload.step3.imgDesc1" />
            </b>
          </div>
        </SlideToggle>
        <SlideToggle title={formatMessage({ id: "desc.title" })}>
          <p>
            <FormattedHTMLMessage id="desc.1st" />
          </p>
          <p>
            <FormattedHTMLMessage id="desc.2nd" />
          </p>
          <p>
            <FormattedHTMLMessage id="desc.3rd" />
          </p>
        </SlideToggle>
        <SlideToggle title={<FormattedMessage id="other.title" />}>
          <p>
            {"★" + formatMessage({ id: "other.code.title" }) + "："}
            <a
              href="https://github.com/matsumatsu233/gitadora-skill-viewer"
              target="_blank"
              rel="noreferrer noopener"
            >
              Github
            </a>
          </p>
          <p>
            {"★"}
            <FormattedMessage id="other.voice.title" />
            {"："}
            <Link to={`${locale}/uservoice`}>User Voice</Link>
          </p>
          <p>
            <FormattedMessage id="other.voice.desc1" />
          </p>
          <p>
            {"★"}
            <FormattedMessage id="other.browser.title" />
          </p>
          <p> Chrome, Safari </p>
        </SlideToggle>
      </div>
    );
  }
}

const styles = {
  indexPage: {
    width: "100%"
  },
  script: {
    background: "#f6f6f6",
    padding: 20,
    borderRadius: 6,
    fontSize: "80%",
    wordBreak: "break-all"
  },
  imageContainer: {
    position: "relative",
    color: "red",
    whiteSpace: "nowrap"
  },
  kasegiLinkDiv: {
    display: "flex",
    whiteSpace: "nowrap",
    flexWrap: "wrap"
  },
  kasegiLink: {
    marginRight: 10
  }
};

export default injectIntl(Radium(Index));
