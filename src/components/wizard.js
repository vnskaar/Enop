import React, {Component} from 'react';

class Wizard extends Component {
    render() {
        return (
            <div>
                <h1>The wizard will now help you</h1>
                <form>
                    <div>
                        <p>
                            <label>
                                Username
                            </label>
                        </p>
                        <p>
                            <input />
                        </p>
                    </div>
                </form>

            </div>
        );
    }
}

export default Wizard;