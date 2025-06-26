import { API_BASE_URL } from "../../config/apiConfig"
import { UserOutlined } from "@ant-design/icons"

const PeopleCard = ({ person, theme }) => {
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  const getRoleColor = (role) => {
    const colors = {
      Director: "rgba(239, 68, 68, 0.1)",
      Investigador: "rgba(37, 99, 235, 0.1)",
      Colaborador: "rgba(16, 185, 129, 0.1)",
      Becario: "rgba(245, 158, 11, 0.1)",
    }
    return colors[role] || "rgba(107, 114, 128, 0.1)"
  }

  const getRoleTextColor = (role) => {
    const colors = {
      Director: "#ef4444",
      Investigador: "#2563eb",
      Colaborador: "#10b981",
      Becario: "#f59e0b",
    }
    return colors[role] || "#6b7280"
  }

  return (
    <div className="team-member-card" data-theme={isDarkTheme ? "dark" : "light"}>
      <div className="member-avatar-container">
        {person.photo?.[0]?.url ? (
          <img
            src={`${API_BASE_URL}${person.photo[0].url}` || person.photo[0].url}
            alt={person.full_name}
            className="member-avatar"
          />
        ) : (
          <div className="member-avatar-placeholder">
            <UserOutlined />
          </div>
        )}
      </div>

      <div className="member-info">
        <h3 className="member-name">{person.full_name}</h3>
        <div
          className="member-role"
          style={{
            background: getRoleColor(person.role_person),
            color: getRoleTextColor(person.role_person),
            border: `1px solid ${getRoleTextColor(person.role_person)}20`,
          }}
        >
          {person.role_person}
        </div>
        {person.especialidad && <p className="member-specialty">{person.especialidad}</p>}
      </div>
    </div>
  )
}

export default PeopleCard
