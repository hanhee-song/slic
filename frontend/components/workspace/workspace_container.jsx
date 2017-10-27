import Workspace from './workspace';
import { connect } from 'react-redux';
import { receiveDropdown, clearDropdown } from '../../actions/ui_actions';


const mapStateToProps = (state) => {
  return {
    dropdown: state.ui.dropdown,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    receiveDropdown: (dropdown) => dispatch(receiveDropdown(dropdown)),
    clearDropdown: () => dispatch(clearDropdown()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Workspace);
