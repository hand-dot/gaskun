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
const gases = ['O2', 'N2', 'Ar', 'H2', 'CO2', 'He', 'C2H2'];

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  mini: {
    maxWidth: 150,
  },
});

class UnitConverter extends React.Component {
  constructor(props) {
    super(props);
    this.glide = null;
  }

  state = {
    gas: gases[0],
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
      input: output,
      inputUnit: outputUnit,
      output: input,
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
        <div style={{ textAlign: 'center' }}>
          <FormControl className={classes.formControl} style={{ display: 'inline-block' }}>
            <TextField
              fullWidth
              id="gas"
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
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </TextField>
            <TextField
              autoFocus
              id="input"
              label="Input"
              value={input}
              onChange={this.handleChange('input')}
              type="number"
              className={classNames(classes.textField, classes.mini)}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="inputUnit"
              label="Unit"
              select
              className={classes.textField}
              value={inputUnit}
              onChange={this.handleChange('inputUnit')}
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
          <div>
            <IconButton className={classes.button} aria-label="reverse" onClick={this.reverse.bind(this)}>
              <Autorenew />
            </IconButton>
          </div>
          <FormControl className={classes.formControl} style={{ display: 'inline-block' }}>
            <TextField
              disabled
              id="output"
              label="output"
              value={output}
              onChange={this.handleChange('output')}
              className={classNames(classes.textField, classes.mini)}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outputUnit"
              label="Unit"
              select
              className={classes.textField}
              value={outputUnit}
              onChange={this.handleChange('outputUnit')}
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
          <div style={{ marginTop: '2rem' }}>
            <Link to="/">
              <Typography>
              Topに戻る
              </Typography>
            </Link>
          </div>
        </div>
      </main>
    );
  }
}

UnitConverter.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
};

export default withStyles(styles)(UnitConverter);
