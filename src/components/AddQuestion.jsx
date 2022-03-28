import React, { useState } from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import CustomInput from '../common-components/forms/CustomInput';

const AddQuestion = ({formQue}) => {
    const [answer, setAnswer] = useState("");
    const multi = 
        (formQue.type.value === "Multichoice Checkbox" ||
        formQue.type.value === "Radio Button")
        ? formQue.selectedOption.split("\n")
        : formQue.selectedOption;

    return ( 
        <>
            
            <div className='heading'>Question - {formQue.question}</div>
            <div className=''>Answer - 
            {formQue.type.value === "Text"
            ?  <CustomInput
            // label='Answer'
            // labelsm={2}
            type="text"
            placeholder='Answer Here'
            // onChange={onChangeHandler}
            name="selectedOption"
            id="selectedOption"
            className='mx-2'
            value={formQue.selectedOption}
        />
        : formQue.type.value === "Multichoice Checkbox"
        ? (multi?.length > 0 && 
        multi.map(item => ( 
        <FormGroup className="">
        <Input
          className="largeCheckBox mx-3"
          type="checkbox"
          id={item}
          name={item}
        //   checked={item}
        //   onChange={(e) =>
        //     onChangeHandler(e.target.name, e.target.checked)
        //   }
        />
          <Label
          className=""
          for={item}
        >
          {item}
        </Label>
      </FormGroup>
      )))
      : formQue.type.value === "Radio Button"
      && multi?.length > 0 && 
      multi.map(item => (
          <> 
        <Input
        type='radio'
        name={item}
        id={item}
        // value={item}
        // onChange={onChangeHandler}
        className="mx-3"
        // checked={item}
      />
      <Label className="text-secondary me-3" for={item}>{item}</Label>
      </>
      ))
        }
        </div>
        </>
     );
}
 
export default AddQuestion;