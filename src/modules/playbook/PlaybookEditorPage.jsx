import DashboardLayout from '../../layout/DashboardLayout';
import Components from '../../components';

function PlaybookEditorPage() {
  return (
    <DashboardLayout>
      <Components.Playbook.PlaybookEditor />
    </DashboardLayout>
  );
}

export default PlaybookEditorPage;
