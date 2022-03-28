import React from 'react';
import { Table } from "reactstrap";
import { getItemFromStorage } from '../utils/Helper';

const FormList = () => {
    const formList = getItemFromStorage('form');
    // console.log(formList);
    return (
        <>
            <div className="header-wrap card">
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                    <div className="header-title me-2 my-2 hr">
                        <h2>Form List</h2>
                    </div>
                </div>
            </div>

            <div className='form-wrapper card'>
                {formList.length > 0
                    ? <div className="table-responsive w-100">
                        <Table className='table'>
                            <thead>
                                <tr>
                                    <th>Form Name</th>
                                    <th>Created At</th>
                                    <th>Url</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formList.map(list => (
                                    <tr>
                                        <td>{list.formName}</td>
                                        <td>{list.created_at}</td>
                                        <td>{list.url}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    : <div className="text-center">Record Not Found</div>
                }
            </div>

        </>
    );
}

export default FormList;