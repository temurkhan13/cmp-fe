// Folder.js
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState, useCallback } from 'react';
import Modal from '../../common/Modal';
import FileStructure from '../../dashboard/FileStructure';
import { useAddFolderMutation } from '../../../redux/api/workspaceApi';
import { AiOutlinePlus } from 'react-icons/ai';
import NotificationBar from '../../common/NotificationBar';
import './styles/Folder.css';
import { BiSolidFolderOpen } from 'react-icons/bi';

const Folder = ({ activeWorkspace, onFolderSelect, onFolderUpdate }) => {
  const [addFolder] = useAddFolderMutation();
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);

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

  const handleNewFolderSubmit = useCallback(
    async (values, { resetForm }) => {
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
        onFolderUpdate(); // Trigger parent update
      } catch (error) {
        setErrorMessage('Failed to add Project.');
        setShowNotification(true);
      }
    },
    [addFolder, activeWorkspace?.id, onFolderUpdate]
  );

  return (
    <div className="dashboard">
      <section className="generate">
        <div className="container-heading">
          <div className="left-buttons">
            <p className="assistant-heading">
              <BiSolidFolderOpen size={30} />
              Projects
            </p>
          </div>
          <div>
            <button
              className="assiss-btn"
              onClick={() => setIsNewFolderModalOpen(true)}
            >
              New Project <AiOutlinePlus />
            </button>
          </div>
        </div>
      </section>

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
          <div className="modal-content-project">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleNewFolderSubmit}
            >
              {({ errors, touched }) => (
                <Form className="modal-form-content">
                  <label className="modal-label">Project Name</label>
                  <Field
                    type="text"
                    name="projectName"
                    placeholder="Enter project name"
                    className={`workspace-input ${
                      touched.projectName && errors.projectName
                        ? 'error-border'
                        : ''
                    }`}
                  />
                  <ErrorMessage
                    name="projectName"
                    component="div"
                    className="error-message"
                  />

                  <p className="business-info-heading">Your Business Info</p>
                  <hr />

                  <label className="modal-label">Company Name</label>
                  <Field
                    type="text"
                    name="companyName"
                    placeholder="Enter Company Name"
                    className={`workspace-input ${
                      touched.companyName && errors.companyName
                        ? 'error-border'
                        : ''
                    }`}
                  />
                  <ErrorMessage
                    name="companyName"
                    component="div"
                    className="error-message"
                  />

                  <label className="modal-label">Company Size</label>
                  <Field
                    type="text"
                    name="companySize"
                    placeholder="Enter company size"
                    className={`workspace-input ${
                      touched.companySize && errors.companySize
                        ? 'error-border'
                        : ''
                    }`}
                  />
                  <ErrorMessage
                    name="companySize"
                    component="div"
                    className="error-message"
                  />

                  <label className="modal-label">Job Title</label>
                  <Field
                    type="text"
                    name="jobTitle"
                    placeholder="Enter job title"
                    className={`workspace-input ${
                      touched.jobTitle && errors.jobTitle ? 'error-border' : ''
                    }`}
                  />
                  <ErrorMessage
                    name="jobTitle"
                    component="div"
                    className="error-message"
                  />

                  <label className="modal-label">Industry</label>
                  <Field
                    type="text"
                    name="industry"
                    placeholder="Enter Industry"
                    className={`workspace-input ${
                      touched.industry && errors.industry ? 'error-border' : ''
                    }`}
                  />
                  <ErrorMessage
                    name="industry"
                    component="div"
                    className="error-message"
                  />

                  <button type="submit" className="create-workspace-btn">
                    Create
                  </button>
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
    </div>
  );
};

export default Folder;
