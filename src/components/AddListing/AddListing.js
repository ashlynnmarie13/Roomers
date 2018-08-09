import React, { Component } from "react";
import { Checkbox, Input } from "semantic-ui-react";
import "./AddListing.css";

class AddListing extends Component {
  state = {
    male: true,
    female: false
  };

  radioHandler = e => {
    console.log(e.target);
    e.target.name === "male"
      ? this.setState({ male: true, female: false })
      : this.setState({ male: false, female: true });
  };

  render() {
    return (
      <div className="add-listing">
        <div className="listing-nav">
          <div>
            <p className="nav-header">List Your Place</p>
          </div>
        </div>
        <div className="listing-sections">
          <div className="listing-section">
            <div>
              <p className="details-header">Who's your ideal roomate?</p>
            </div>
            <div className="section-details">
              <div className="selection">
                <div className="selection-title">Age:</div>
                <div className="section-inputs">
                  <div className="age-input">
                    <Checkbox id="early20s" />
                    <label className="label" htmlFor="early20s">
                      Early 20s
                    </label>
                  </div>
                  <div className="age-input">
                    <Checkbox id="late20s" />
                    <label className="label" htmlFor="late20s">
                      Late 20s
                    </label>
                  </div>
                  <div className="age-input">
                    <Checkbox id="30s" />
                    <label className="label" htmlFor="30s">
                      30s
                    </label>
                  </div>
                  <div className="age-input">
                    <Checkbox id="40sAndOlder" />
                    <label className="label" htmlFor="40sAndOlder">
                      Early 20s
                    </label>
                  </div>
                </div>
              </div>
              <div className="selection">
                <div className="selection-title">Gender:</div>
                <div className="section-inputs">
                  <div className="age-input">
                    <Checkbox
                      onClick={this.radioHandler}
                      style={{ fontSize: "18px", margin: "3px 0" }}
                      radio
                      checked={this.state.male}
                      name="male"
                      label="Male"
                    />
                  </div>
                  <div className="age-input">
                    <Checkbox
                      onClick={event => this.radioHandler(event)}
                      style={{ fontSize: "18px", margin: "3px 0" }}
                      radio
                      checked={this.state.female}
                      name="female"
                      label="Female"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div />
          </div>
          <div className="listing-section">
            <div>
              <p className="details-header">Where's your place located?</p>
            </div>
            <div className="section-details">
              <div className="address">
                <div className="selection-title">Address:</div>
                <div className="section-address-inputs">
                  <div className="address-input">
                    <Input
                      style={{ width: "100%", margin: "5px 10px" }}
                      placeholder="Street Address"
                    />
                  </div>
                  <div className="address-input">
                    <Input
                      style={{ width: "100%", margin: "5px 10px" }}
                      placeholder="Apt#"
                    />
                  </div>
                </div>
                <div className="section-address-inputs-three">
                  <div className="address-input">
                    <Input
                      style={{ width: "100%", margin: "5px 10px" }}
                      placeholder="City"
                    />
                  </div>
                  <div className="address-input">
                    <Input
                      style={{ width: "100%", margin: "5px 10px" }}
                      placeholder="State"
                    />
                  </div>
                  <div className="address-input">
                    <Input
                      style={{ width: "100%", margin: "5px 10px" }}
                      placeholder="Zip"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div />
          </div>
          <div className="listing-section">
            <div>
              <p className="details-header">Who's your ideal roomate?</p>
            </div>
            <div className="section-details">
              <div className="selection">
                <div className="selection-title">Age:</div>
                <div className="section-inputs">
                  <div className="age-input">
                    <Checkbox id="early20s" />
                    <label className="label" htmlFor="early20s">
                      Early 20s
                    </label>
                  </div>
                  <div className="age-input">
                    <Checkbox id="late20s" />
                    <label className="label" htmlFor="late20s">
                      Late 20s
                    </label>
                  </div>
                  <div className="age-input">
                    <Checkbox id="30s" />
                    <label className="label" htmlFor="30s">
                      30s
                    </label>
                  </div>
                  <div className="age-input">
                    <Checkbox id="40sAndOlder" />
                    <label className="label" htmlFor="40sAndOlder">
                      Early 20s
                    </label>
                  </div>
                </div>
              </div>
              <div className="selection">
                <div className="selection-title">Gender:</div>
                <div className="section-inputs">
                  <div className="age-input">
                    <Checkbox
                      onClick={this.radioHandler}
                      style={{ fontSize: "18px", margin: "3px 0" }}
                      radio
                      checked={this.state.male}
                      name="male"
                      label="Male"
                    />
                  </div>
                  <div className="age-input">
                    <Checkbox
                      onClick={event => this.radioHandler(event)}
                      style={{ fontSize: "18px", margin: "3px 0" }}
                      radio
                      checked={this.state.female}
                      name="female"
                      label="Female"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div />
          </div>
          <div className="listing-section">
            <div>
              <p className="details-header">Who's your ideal roomate?</p>
            </div>
            <div className="section-details">
              <div className="selection">
                <div className="selection-title">Age:</div>
                <div className="section-inputs">
                  <div className="age-input">
                    <Checkbox id="early20s" />
                    <label className="label" htmlFor="early20s">
                      Early 20s
                    </label>
                  </div>
                  <div className="age-input">
                    <Checkbox id="late20s" />
                    <label className="label" htmlFor="late20s">
                      Late 20s
                    </label>
                  </div>
                  <div className="age-input">
                    <Checkbox id="30s" />
                    <label className="label" htmlFor="30s">
                      30s
                    </label>
                  </div>
                  <div className="age-input">
                    <Checkbox id="40sAndOlder" />
                    <label className="label" htmlFor="40sAndOlder">
                      Early 20s
                    </label>
                  </div>
                </div>
              </div>
              <div className="selection">
                <div className="selection-title">Gender:</div>
                <div className="section-inputs">
                  <div className="age-input">
                    <Checkbox
                      onClick={this.radioHandler}
                      style={{ fontSize: "18px", margin: "3px 0" }}
                      radio
                      checked={this.state.male}
                      name="male"
                      label="Male"
                    />
                  </div>
                  <div className="age-input">
                    <Checkbox
                      onClick={event => this.radioHandler(event)}
                      style={{ fontSize: "18px", margin: "3px 0" }}
                      radio
                      checked={this.state.female}
                      name="female"
                      label="Female"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div />
          </div>
          <div className="listing-section">
            <div>
              <p className="details-header">Who's your ideal roomate?</p>
            </div>
            <div className="section-details">
              <div className="selection">
                <div className="selection-title">Age:</div>
                <div className="section-inputs">
                  <div className="age-input">
                    <Checkbox id="early20s" />
                    <label className="label" htmlFor="early20s">
                      Early 20s
                    </label>
                  </div>
                  <div className="age-input">
                    <Checkbox id="late20s" />
                    <label className="label" htmlFor="late20s">
                      Late 20s
                    </label>
                  </div>
                  <div className="age-input">
                    <Checkbox id="30s" />
                    <label className="label" htmlFor="30s">
                      30s
                    </label>
                  </div>
                  <div className="age-input">
                    <Checkbox id="40sAndOlder" />
                    <label className="label" htmlFor="40sAndOlder">
                      Early 20s
                    </label>
                  </div>
                </div>
              </div>
              <div className="selection">
                <div className="selection-title">Gender:</div>
                <div className="section-inputs">
                  <div className="age-input">
                    <Checkbox
                      onClick={this.radioHandler}
                      style={{ fontSize: "18px", margin: "3px 0" }}
                      radio
                      checked={this.state.male}
                      name="male"
                      label="Male"
                    />
                  </div>
                  <div className="age-input">
                    <Checkbox
                      onClick={event => this.radioHandler(event)}
                      style={{ fontSize: "18px", margin: "3px 0" }}
                      radio
                      checked={this.state.female}
                      name="female"
                      label="Female"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div />
          </div>
        </div>
      </div>
    );
  }
}

export default AddListing;
