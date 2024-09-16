import FileStructure from '../../dashboard/FileStructure';
import { TiPlus } from 'react-icons/ti';
import { FaFolderTree } from 'react-icons/fa6';
import { useState } from 'react';
import { useAddFolderMutation } from '../../../redux/api/workspaceApi';
import Modal from '../../common/Modal'; // Assuming the modal is imported from here
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation

const Folder = ({ activeWorkspace }) => {
  const [addFolder] = useAddFolderMutation();
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);

  // Define validation schema
  const validationSchema = Yup.object({
    projectName: Yup.string()
      .required('Project Name is required')
      .min(3, 'Project Name must be at least 3 characters'),
    companySize: Yup.string()
      .required('Company Size is required')
      .matches(/^[0-9]+$/, 'Company Size must be a number'),
    websiteURL: Yup.string()
      .url('Invalid URL format')
      .required('Website URL is required'),
    jobTitle: Yup.string().required('Job Title is required'),
  });

  const initialValues = {
    projectName: '',
    companySize: '',
    websiteURL: '',
    jobTitle: '',
  };

  const handleNewFolderSubmit = async (values, { resetForm }) => {
    try {
      console.log(values.projectName);
      await addFolder({
        workspaceId: activeWorkspace.id,
        folderName: values.projectName,
      }).unwrap();
      setIsNewFolderModalOpen(false);
      resetForm();
    } catch (error) {
      console.error('Failed to add Project:', error);
    }
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
            <div>
              <button
                className="assiss-btn"
                onClick={() => setIsNewFolderModalOpen(true)}
              >
                <TiPlus />
                New Project
              </button>
            </div>
          </div>
        </div>
      </section>
      <FileStructure workspace={activeWorkspace} />
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

                    <label className="modal-label">Website URL</label>
                    <Field
                      type="text"
                      name="websiteURL"
                      placeholder="Enter website URL"
                      className={`workspace-input ${
                        touched.websiteURL && errors.websiteURL
                          ? 'error-border'
                          : ''
                      }`}
                    />
                    <ErrorMessage
                      name="websiteURL"
                      component="div"
                      className="error-message"
                    />

                    <label className="modal-label">Job Title</label>
                    <Field
                      type="text"
                      name="jobTitle"
                      placeholder="Enter job title"
                      className={`workspace-input ${
                        touched.jobTitle && errors.jobTitle
                          ? 'error-border'
                          : ''
                      }`}
                    />
                    <ErrorMessage
                      name="jobTitle"
                      component="div"
                      className="error-message"
                    />

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

      <style>{`
        .dashboard {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .generate {
          background-color: rgba(249, 249, 249, 1);
        }
        .generate .container {
          display: flex;
          text-align: center;
          align-items: center;
          justify-content: space-between;
          padding: 2%;
          height: 10vh;
        }
        .generate .assistant-heading {
          font-family: 'Poppins';
          font-weight: 600;
          line-height: 36px;
          letter-spacing: 0.12px;
          font-size:2rem;
          text-align: left;
          color: black;
          display:flex;
          align-items: center;
          gap:1rem;
        }
        .generate .assiss-btn {
          background-color: #C3E11D;
          color: #0B1444;
          border:none;
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
          width: 40vw;
        }
        .modal-form-content {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .workspace-input {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .create-workspace-btn {
          background-color: #C3E11D;
          color: #0B1444;
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
      `}</style>
    </div>
  );
};

export default Folder;
