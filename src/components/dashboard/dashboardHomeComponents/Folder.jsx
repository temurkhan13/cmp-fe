import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FaFolderTree } from 'react-icons/fa6';
import { useState } from 'react';
import Modal from '../../common/Modal';
import FileStructure from '../../dashboard/FileStructure';
import { useAddFolderMutation } from '../../../redux/api/workspaceApi';
import { AiOutlinePlus } from 'react-icons/ai';
import NotificationBar from '../../common/NotificationBar';

const Folder = ({ activeWorkspace, onFolderSelect, onFolderUpdate }) => {
  const [addFolder] = useAddFolderMutation();
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  // Validation schema for new folder creation
  const validationSchema = Yup.object({
    projectName: Yup.string()
      .required('Project Name is required')
      .min(3, 'Project Name must be at least 3 characters'),
    companySize: Yup.string()
      .required('Company Size is required')
      .matches(/^[0-9]+$/, 'Company Size must be a number'),
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

  const handleNewFolderSubmit = async (values, { resetForm }) => {
    try {
      await addFolder({
        workspaceId: activeWorkspace.id,
        folderName: values.projectName,
        businessInfo: {
          companySize: values.companySize,
          companyName: values.companyName,
          jobTitle: values.jobTitle,
          industry: values.industry,
        },
      }).unwrap();
      setIsNewFolderModalOpen(false);
      resetForm();
      onFolderUpdate(); // Notify the parent component to refresh folder data
    } catch (error) {
      showError('Failed to add Project.');
    }
  };

  const showError = (message) => {
    setErrorMessage(message);
    setShowNotification(true);
  };

  return (
    <div className="dashboard">
      <section className="generate" style={{ marginTop: '2rem' }}>
        <div className="container">
          <div className="left-buttons">
            <p className="assistant-heading">
              <FaFolderTree />
              Projects
            </p>
          </div>

          <div className="center-buttons">
            <button
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              className="assiss-btn"
              onClick={() => setIsNewFolderModalOpen(true)}
            >
              New Project
              <AiOutlinePlus className="icon" />
            </button>
          </div>
        </div>
      </section>

      {/* Show the FileStructure based on the selected workspace */}
      {activeWorkspace && activeWorkspace.folders?.length > 0 ? (
        <FileStructure
          workspace={activeWorkspace}
          onFolderSelect={onFolderSelect}
          onFolderUpdate={onFolderUpdate}
        />
      ) : (
        <div className="no-projects">
          <p>No projects associated with this workspace.</p>
        </div>
      )}

      {isNewFolderModalOpen && (
        <Modal
          title="Create New Project"
          isOpen={isNewFolderModalOpen}
          onClose={() => setIsNewFolderModalOpen(false)}
        >
          <div className="modal-content">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleNewFolderSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="modal-form-content">
                    <label className="modal-label">Project Name</label>
                    <Field
                      type="text"
                      name="projectName"
                      placeholder="Enter project name"
                      className={`workspace-input ${touched.projectName && errors.projectName ? 'error-border' : ''}`}
                    />
                    <ErrorMessage name="projectName" component="div" className="error-message" />

                    <p className="business-info-heading">Your Business Info</p>
                    <hr />

                    <label className="modal-label">Company Name</label>
                    <Field
                      type="text"
                      name="companyName"
                      placeholder="Enter Company Name"
                      className={`workspace-input ${touched.companyName && errors.companyName ? 'error-border' : ''}`}
                    />
                    <ErrorMessage name="companyName" component="div" className="error-message" />

                    <label className="modal-label">Company Size</label>
                    <Field
                      type="text"
                      name="companySize"
                      placeholder="Enter company size"
                      className={`workspace-input ${touched.companySize && errors.companySize ? 'error-border' : ''}`}
                    />
                    <ErrorMessage name="companySize" component="div" className="error-message" />

                    <label className="modal-label">Job Title</label>
                    <Field
                      type="text"
                      name="jobTitle"
                      placeholder="Enter job title"
                      className={`workspace-input ${touched.jobTitle && errors.jobTitle ? 'error-border' : ''}`}
                    />
                    <ErrorMessage name="jobTitle" component="div" className="error-message" />

                    <label className="modal-label">Industry</label>
                    <Field
                      type="text"
                      name="industry"
                      placeholder="Enter Industry"
                      className={`workspace-input ${touched.industry && errors.industry ? 'error-border' : ''}`}
                    />
                    <ErrorMessage name="industry" component="div" className="error-message" />

                    <button type="submit" className="create-workspace-btn">
                      Create
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Modal>
      )}

      {showNotification && (
        <NotificationBar
          message={errorMessage}
          type="error"
          duration={5000}
          onClose={() => setShowNotification(false)}
        />
      )}

      <style>{`
        .dashboard {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .generate {
          background-color: white;
        }
        .generate .container {
          display: flex;
          text-align: center;
          align-items: center;
          justify-content: space-between;
          padding: 2%;
          height: 10vh;
          border: 1px solid lightgray;
          background-color: white;
          width: 95%;
          border-radius: 1.5rem;
          margin: 0 3rem;
        }
        .generate .assistant-heading {
          font-family: 'Poppins';
          font-weight: 600;
          line-height: 36px;
          letter-spacing: 0.12px;
          font-size: 2rem;
          text-align: left;
          color: black;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .generate .assiss-btn {
          background-color: #c3e11d;
          color: #0b1444;
          border: none;
          display: flex;
          text-align: center;
          align-items: center;
          justify-content: space-between;
          border-radius: 0.8rem;
          font-weight: 600;
          padding: 0.9rem 2rem;
        }
        .modal-content {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          width:500px;
        }
        .modal-form-content {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .create-workspace-btn {
          background-color: #c3e11d;
          color: #0b1444;
          padding: 1rem 2rem;
          font-size: 1.6rem;
          border: none;
          border-radius: 0.8rem;
        }
        .modal-label {
          font-size: 1.4rem;
          font-weight: 500;
        }
        .business-info-heading {
          font-size: 1.6rem;
          font-weight: 500;
          text-align: center;
        }
        .error-message {
          color: red;
          font-size: 1.2rem;
        }
        .error-border {
          border-color: red;
        }
        .no-projects {
          padding: 2rem;
          text-align: center;
          font-size: 1.6rem;
          color: gray;
        }
        .workspace-input,
        .workspace-description {
          border: 1px solid #ccc;
          width: 100%;
          border-radius: 1rem;
          padding: 1rem;
          font-size: 1.5rem;
        }
      `}</style>
    </div>
  );
};

export default Folder;
