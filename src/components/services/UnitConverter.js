import React from 'react';
import PropTypes from 'prop-types';
import guc from 'guc';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Autorenew from '@material-ui/icons/Autorenew';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';


const units = ['kg', 'L', 'Nm3', 'Sm3'];
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
  menu: {
    width: 200,
  },
});

class UnitConverter extends React.Component {
  constructor(props) {
    super(props);
    this.glide = null;
  }

  state = {
    gas: gases[0],
    input: 0,
    inputUnit: units[0],
    output: 0,
    outputUnit: units[1],
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
    this.setState({
      [name]: event.target.value,
      output: guc(gas, inputUnit, outputUnit, +input),
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
        <p>単位変換</p>
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
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu,
                },
              }}
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
              id="input"
              label="Input"
              value={input}
              onChange={this.handleChange('input')}
              type="number"
              className={classes.textField}
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
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
              variant="outlined"
            >
              {units.map(option => (
                <option key={option} value={option}>
                  {option}
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
              type="number"
              className={classes.textField}
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
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
              variant="outlined"
            >
              {units.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </TextField>
          </FormControl>
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

export default withStyles(styles)(UnitConverter);
