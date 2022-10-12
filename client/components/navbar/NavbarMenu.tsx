import { Avatar, Dropdown, Navbar, Text } from '@nextui-org/react'

export const NavbarMenu = () => {
  return (
    <Dropdown placement="bottom-right">
        <Dropdown.Trigger>
            <Avatar
                bordered
                zoomed
                as="button"
                color="gradient"
                size="md"
                src="https://www.tonica.la/__export/1665268080767/sites/debate/img/2022/10/08/daredevil-shehulk-serie.jpg_1037907269.jpg"
            />
        </Dropdown.Trigger>
        <Dropdown.Menu
            aria-label="User menu actions"
            color="secondary"
            onAction={(actionKey) => console.log({ actionKey })}
        >
            <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                Signed in as
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                zoey@example.com
                </Text>
            </Dropdown.Item>
            <Dropdown.Item key="settings" withDivider>
                My Settings
            </Dropdown.Item>
            <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
            <Dropdown.Item key="analytics" withDivider>
                Analytics
            </Dropdown.Item>
            <Dropdown.Item key="system">System</Dropdown.Item>
            <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
            <Dropdown.Item key="help_and_feedback" withDivider>
                Help & Feedback
            </Dropdown.Item>
            <Dropdown.Item key="logout" withDivider color="error">
                Log Out
            </Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
  )
}