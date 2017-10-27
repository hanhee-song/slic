import Workspace from './workspace';
import { connect } from 'react-redux';
import { receiveDropdown } from '../../actions/ui_actions';


const mapStateToProps = (state) => {
  return {
    dropdown: state.ui.dropdown,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    receiveDropdown: (dropdown) => dispatch(receiveDropdown(dropdown)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Workspace);
