import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import guc from 'guc';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Autorenew from '@material-ui/icons/Autorenew';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import ServiceHeader from './ServiceHeader';

const units = [{ value: 'kg', label: 'kg' }, { value: 'L', label: 'L' }, { value: 'Nm3', label: 'Nm3(0℃)' }, { value: 'Sm3', label: 'Sm3(35℃)' }];
const gases = [{ value: 'O2', label: '酸素(O2)' }, { value: 'N2', label: '窒素(N2)' }, { value: 'Ar', label: 'アルゴン(Ar)' }, { value: 'H2', label: '水素(H2)' }, { value: 'CO2', label: '二酸化炭素(CO2)' }, { value: 'He', label: 'ヘリウム(He)' }, { value: 'C2H2', label: 'アセチレン(C2H2)' }];

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    display: 'inline-block',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  mini: {
    width: '45%',
  },
});

class UnitConverter extends React.Component {
  constructor(props) {
    super(props);
    this.glide = null;
  }

  state = {
    gas: gases[0].value,
    input: '',
    inputUnit: units[0].value,
    output: 0,
    outputUnit: units[1].value,
  };

  handleChange = name => (event) => {
    let {
      gas, inputUnit, outputUnit, input,
    } = this.state;
    if (name === 'gas') {
      gas = event.target.value;
    } else if (name === 'inputUnit') {
      inputUnit = event.target.value;
    } else if (name === 'outputUnit') {
      outputUnit = event.target.value;
    } else if (name === 'input') {
      input = event.target.value;
    }
    const output = guc(gas, inputUnit, outputUnit, +input);
    this.setState({
      [name]: event.target.value,
      output: output === null ? 'Error' : output,
    });
  };

  reverse() {
    this.setState(({
      input, inputUnit, output, outputUnit,
    }) => ({
      input: output === 'Error' ? '' : output, // アセチレンのエラー処理
      inputUnit: outputUnit,
      output: output === 'Error' ? 'Error' : input, // アセチレンのエラー処理
      outputUnit: inputUnit,
    }));
  }

  render() {
    const { classes } = this.props;
    const {
      gas, input, inputUnit, output, outputUnit,
    } = this.state;
    return (
      <main>
        <ServiceHeader {...this.props} />
        <FormControl className={classes.formControl}>
          <TextField

            label="Gas"
            select
            className={classes.textField}
            value={gas}
            onChange={this.handleChange('gas')}
            SelectProps={{ native: true }}
            margin="normal"
            variant="outlined"
          >
            {gases.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </FormControl>
        <Form
          value={input.toString()}
          unit={inputUnit}
          type="input"
          handleChange={this.handleChange.bind(this)}
          {...this.props}
        />
        <div style={{ textAlign: 'center' }}>
          <IconButton className={classes.button} aria-label="reverse" onClick={this.reverse.bind(this)}>
            <Autorenew />
          </IconButton>
        </div>
        <Form
          value={output.toString()}
          unit={outputUnit}
          type="output"
          handleChange={this.handleChange.bind(this)}
          {...this.props}
        />
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Link to="/">
            <Typography>
              Topに戻る
            </Typography>
          </Link>
        </div>
      </main>
    );
  }
}

UnitConverter.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
};

function Form(props) {
  const {
    classes, value, unit, type, handleChange,
  } = props;
  return (
    <FormControl fullWidth className={classes.formControl}>
      <TextField
        autoFocus={type === 'input'}
        disabled={type === 'output'}
        label={type}
        value={value}
        type={type === 'input' ? 'number' : 'text'}
        onChange={e => handleChange(type)(e)}
        className={classNames(classes.textField, classes.mini)}
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Unit"
        select
        className={classNames(classes.textField, classes.mini)}
        value={unit}
        onChange={e => handleChange(`${type}Unit`)(e)}
        SelectProps={{ native: true }}
        margin="normal"
        variant="outlined"
      >
        {units.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>

    </FormControl>
  );
}

Form.propTypes = {
  value: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired, // eslint-disable-line
};

export default withStyles(styles)(UnitConverter);
