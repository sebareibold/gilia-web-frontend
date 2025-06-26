import { API_BASE_URL } from "../../config/apiConfig"
import { UserOutlined } from "@ant-design/icons"

const PeopleCard = ({ person, theme }) => {
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  return (
    <div
      className="futuristic-card"
      data-theme={isDarkTheme ? "dark" : "light"}
      style={{
        textAlign: "center",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ marginBottom: "1rem" }}>
        {person.photo?.[0]?.url ? (
          <img
            src={`${API_BASE_URL}${person.photo[0].url}`}
            alt={person.full_name}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid rgba(255, 255, 255, 0.2)",
              marginBottom: "1rem",
            }}
          />
        ) : (
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1rem",
              border: "2px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <UserOutlined style={{ fontSize: "2rem", color: "var(--colorTextSecondary)" }} />
          </div>
        )}
      </div>

      <div>
        <h3
          style={{
            color: "var(--colorTextBase)",
            fontSize: "1rem",
            fontWeight: "600",
            marginBottom: "0.5rem",
            lineHeight: "1.3",
          }}
        >
          {person.full_name}
        </h3>

        <div className="futuristic-badge" style={{ fontSize: "0.65rem" }}>
          {person.role_person}
        </div>
      </div>
    </div>
  )
}

export default PeopleCard
