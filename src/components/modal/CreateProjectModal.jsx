import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import Button from '../common/Button';
import Modal from './Modal';

const validationSchema = Yup.object({
  projectName: Yup.string()
    .required('Project Name is required')
    .min(3, 'Project Name must be at least 3 characters'),
  companySize: Yup.string()
    .required('Company Size is required')
    .matches(/^[1-9][0-9]*$/, 'Company Size must be a positive number'),
  companyName: Yup.string().required('Company Name is required'),
  jobTitle: Yup.string().required('Job Title is required'),
  industry: Yup.string().required('Industry is required'),
});

const initialValues = {
  projectName: '',
  companySize: '',
  companyName: '',
  jobTitle: '',
  industry: '',
};

const CreateProjectModal = ({ isOpen, onClose, onSubmit }) => {
  const handleSubmit = async (values) => {
    await onSubmit(values);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Project">
      <div className="modal-content-project">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="modal-form-content">
              <div className={`form-field ${touched.projectName && errors.projectName ? "error-field" : ""}`}>
                <label className="modal-label">Project Name</label>
                <div className="input-container">
                  <Field
                    type="text"
                    name="projectName"
                    placeholder="Enter project name"
                    className={`workspace-input ${touched.projectName && errors.projectName ? 'error-border' : ''}`}
                  />
                  <ErrorMessage name="projectName" component="div" className="error-message" />
                </div>
              </div>

              <div className={`form-field ${touched.companyName && errors.companyName ? "error-field" : ""}`}>
                <label className="modal-label">Company Name</label>
                <div className="input-container">
                  <Field
                    type="text"
                    name="companyName"
                    placeholder="Enter Company Name"
                    className={`workspace-input ${touched.companyName && errors.companyName ? 'error-border' : ''}`}
                  />
                  <ErrorMessage name="companyName" component="div" className="error-message" />
                </div>
              </div>

              <div className={`form-field ${touched.companySize && errors.companySize ? "error-field" : ""}`}>
                <label className="modal-label">Company Size</label>
                <div className="input-container">
                  <Field
                    type="text"
                    name="companySize"
                    placeholder="Enter company size"
                    className={`workspace-input ${touched.companySize && errors.companySize ? 'error-border' : ''}`}
                  />
                  <ErrorMessage name="companySize" component="div" className="error-message" />
                </div>
              </div>

              <div className={`form-field ${touched.jobTitle && errors.jobTitle ? "error-field" : ""}`}>
                <label className="modal-label">Job Title</label>
                <div className="input-container">
                  <Field
                    type="text"
                    name="jobTitle"
                    placeholder="Enter job title"
                    className={`workspace-input ${touched.jobTitle && errors.jobTitle ? 'error-border' : ''}`}
                  />
                  <ErrorMessage name="jobTitle" component="div" className="error-message" />
                </div>
              </div>

              <div className={`form-field ${touched.industry && errors.industry ? "error-field" : ""}`}>
                <label className="modal-label">Industry</label>
                <div className="input-container">
                  <Field
                    type="text"
                    name="industry"
                    placeholder="Enter Industry"
                    className={`workspace-input ${touched.industry && errors.industry ? 'error-border' : ''}`}
                  />
                  <ErrorMessage name="industry" component="div" className="error-message" />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="create-workspace-btn"
                loading={isSubmitting}
              >
                Create
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

CreateProjectModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CreateProjectModal;
