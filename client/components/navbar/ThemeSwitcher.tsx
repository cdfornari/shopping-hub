import { Switch, useTheme } from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes';
import { FaMoon } from 'react-icons/fa';
import { RiSunFill } from 'react-icons/ri';

export const ThemeSwitcher = () => {
    const { setTheme } = useNextTheme();
    const { isDark } = useTheme();
    return (
        <Switch
            checked={isDark}
            size="lg"
            onChange={e => setTheme(e.target.checked ? 'dark' : 'light')}
            iconOn={<FaMoon/>}
            iconOff={<RiSunFill/>}
        />
    )
}