/**
 * Created by Nazimov Andrey.
 * Date: 7/25/18
 * Time: 9:07 AM
 */

import React from 'react';

export default class BaseScreen extends React.Component {

    componentDidMount() {
        this.props.navigation.setParams({goBack: this._goBack});
    }

    _goBack = () => {
        this.props.navigation.goBack();
    };

}