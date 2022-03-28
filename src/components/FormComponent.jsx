import React, { useState, useEffect } from 'react';
import { Row, Col, Modal, ModalBody } from "reactstrap";
import { getForms, addForms } from '../redux/actions/form';
import { useSelector, useDispatch } from 'react-redux';
import CustomInput from '../common-components/forms/CustomInput';
import Spinner from "./Spinner";
import ReactSelect from "../common-components/forms/ReactSelect";
import CrossIcon from "../assets/images/cross.png";
import { validate } from '../utils/Helper';
import AddQuestion from './AddQuestion';
import { setItemInStorage } from '../utils/Helper';
import moment from 'moment';

const Form = () => {
    const initForm =
    {
        question: "",
        type: null,
        selectedOption: "",
    }

    const options = [
        { value: "Text", label: "Text" },
        { value: "Multichoice Checkbox", label: "Multichoice Checkbox" },
        { value: "Radio Button", label: "Radio Button" },
    ]

    const dispatch = useDispatch();
    const form = useSelector(state => state.form.form);
    const loading = useSelector(state => state.form.loading);
    const error = useSelector(state => state.form.error);
    const [formName, setFormName] = useState("Untitled Form");
    const [id, setID] = useState(null);
    const [formData, setFormData] = useState(initForm);
    const [errors, setErrors] = useState({});
    const [formArr, setFormArr] = useState([]);
    const { question, selectedOption, type } = formData;
    const [addModal, setAddModal] = useState(false);
    const toggleAddModal = () => {
        setAddModal(!addModal);
    }

    useEffect(() => {
        dispatch(getForms(form));
    }, []);

    const onChangeHandler = (name, inputValue) => {
        setFormData({
            ...formData,
            [name]: inputValue
        })

        setErrors({
            ...errors,
            [name]: ""
        })
    }

    const validationHandler = (name, errorMessage) => {
        setErrors({
            ...errors,
            [name]: errorMessage
        })
    }

    const handleAddQue = () => {
        let array = [...formArr];
        let data = { ...formData };
        let data1 = { question: formData.question, type: formData.type };
        const tempErrors = { ...errors };

        let isValid =
            formData.type.value === "Text"
                ? validate({ ...data1 }, tempErrors, [])
                : validate({ ...data }, tempErrors, []);
        if (isValid === true) {
            array.push(formData);
            setFormArr(array);
            setAddModal(!addModal);
            setFormData(initForm);
        } else {
            setErrors(isValid);
        }
    }

    const convertToSlug = (Text) => {
        return Text
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '')
            ;
    }

    const saveForm = () => {
        let nameUrl = [{
            formName: formName,
            id: Math.random()
        }];

        let url = convertToSlug(JSON.stringify(nameUrl));
        const created_at = moment(new Date()).format("DD-MM-YYYY");
        let data = {
            formName: formName,
            created_at: created_at,
            question: formArr,
            url: url
        };
        let formDataInLS = localStorage.getItem("form");
        var arrData = [];

        if (formDataInLS === null) {
            arrData.push(data);
        }else {
            arrData = JSON.parse(formDataInLS);
            arrData.push(data);
        }
        setItemInStorage("form", arrData);
        setFormName("Untitled Form");
        setFormData(initForm);

        dispatch(addForms(arrData));
    }

    return (
        loading
            ? <Spinner />
            : <>
                <div className="header-wrap card">
                    <div className="d-flex flex-wrap justify-content-between align-items-center">
                        <div className="header-title me-2 my-2 hr">
                            <h2>Build Forms</h2>
                        </div>
                    </div>
                </div>

                <div className='form-wrapper card'>
                    <Row>
                        <Col>
                            <CustomInput
                                label='Form Name'
                                labelsm={2}
                                type="text"
                                placeholder='Enter Form Name'
                                onChange={(name, value) => setFormName(value)}
                                name="formName"
                                id="formName"
                                className='mx-2'
                                value={formName}
                            />
                        </Col>
                        <Col>
                            <div className='btn theme-btn theme-primary my-4'
                                onClick={() => toggleAddModal()}
                            > New Question
                            </div>
                        </Col>
                        <Col>
                            <div className={`btn theme-btn my-4 ${formArr.length === 0
                                ? 'btn-secondary'
                                : 'theme-danger'}`}
                                disabled={formArr.length === 0}
                                onClick={() => saveForm()}
                            > Save Form
                            </div>
                        </Col>
                    </Row>
                </div>
                {formArr.length > 0 && (
                    <div className='form-wrapper card'>
                        <h4>Questions</h4>
                        <hr />
                        {formArr.map(item => (
                            <AddQuestion formQue={item} />
                        ))}
                    </div>
                )}

                <Modal isOpen={addModal} toggle={toggleAddModal}
                    className="model">
                    <ModalBody>
                        <div className="modal_header">
                            <span className="modal_title">{formName}</span>
                            <img src={CrossIcon} alt="" className="ms-auto cursor_pointer"
                                onClick={toggleAddModal} />
                        </div>
                        <hr />
                        <Row>
                            <Col>
                                <CustomInput
                                    label="Question"
                                    type="text"
                                    onChange={onChangeHandler}
                                    name="question"
                                    id="question"
                                    className='margin-30px-bottom'
                                    value={question}
                                    placeholder="Enter Question"
                                    validationHandler={validationHandler}
                                    error={errors.question}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ReactSelect
                                    label="Answer Type"
                                    labelsm={2}
                                    options={options}
                                    value={type}
                                    name="type"
                                    id="type"
                                    className='margin-30px-bottom'
                                    onChange={onChangeHandler}
                                    placeholder="Select Answer Type"
                                    validationHandler={validationHandler}
                                    error={errors.type}
                                />
                            </Col>
                        </Row>
                        {type !== null && (
                            <Row>
                                <Col>
                                    {(type.value === "Multichoice Checkbox"
                                        || type.value === "Radio Button")
                                        && <CustomInput
                                            label="Options"
                                            type="textarea"
                                            className="m-3"
                                            name='selectedOption'
                                            id='selectedOption'
                                            value={selectedOption}
                                            onChange={onChangeHandler}
                                            validationHandler={validationHandler}
                                            error={errors.selectedOption}
                                        />
                                    }
                                </Col>
                            </Row>
                        )}
                        <div className="btn theme-btn theme-primary"
                            onClick={() => handleAddQue()}
                        >
                            Add Question
                        </div>
                    </ModalBody>
                </Modal>
            </>
    );
}

export default Form;