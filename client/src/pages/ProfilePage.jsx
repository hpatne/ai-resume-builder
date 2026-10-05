// Profile page (/profile).
import { useAuth } from '../context/AuthContext'
import { useResumes } from '../context/ResumeContext'
import PageHeader from '../components/PageHeader'
import AccountSummary from '../components/AccountSummary'
import ProfileDetailsForm from '../components/ProfileDetailsForm'
import ChangePasswordForm from '../components/ChangePasswordForm'

function ProfilePage() {
  const { user } = useAuth()
  const { resumes } = useResumes()

  return (
    <>
      <PageHeader title="Profile" description="Manage your account details and password." />
      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <AccountSummary user={user} resumes={resumes} />
        <div className="space-y-5">
          {/* key resets the form after the user is saved */}
          <ProfileDetailsForm key={`${user.name}-${user.email}`} />
          <ChangePasswordForm />
        </div>
      </div>
    </>
  )
}

export default ProfilePage
