import {DefaultGioProps} from "../constants/DefaultGioProps";

var Utils = (function() {

    function inject(vessel, values) {
        for (var attribute in values) {
            if (isObject(values[attribute])) {
                if (isObject(vessel[attribute])) {
                    inject(vessel[attribute], values[attribute]);
                }
            } else {
                if (vessel[attribute] !== undefined) {
                    vessel[attribute] = values[attribute];
                }
            }
        }
    }

    function isObject(value) {

        return (value instanceof Object) && !(value instanceof Array);

    }

    function setStyle(component, props) {

        var width = component.props.width !== undefined ? component.props.width : DefaultGioProps.width;
        var height = component.props.height !== undefined ? component.props.height : DefaultGioProps.height;

        if (props.width !== undefined) {
            width = props.width;
        }

        if (props.height !== undefined) {
            height = props.height;
        }

        component.setState({
            width: width,
            height: height
        }, function() {
            component._controller.resizeUpdate();
        });
    }

    return {

        setStyle: setStyle,

        inject: inject
    }

}());

export {Utils}