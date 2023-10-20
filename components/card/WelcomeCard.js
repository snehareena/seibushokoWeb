import { Card, Title, Space, List, ThemeIcon, Text } from '@mantine/core';
import { useTranslation } from "next-i18next";

export function WelcomeCard({username}) {
	const { t } = useTranslation("common");
	return (
		<Card radius="lg">
			<Title order={1} c="indigo">
				{t('Welcome back!')}
			</Title>
			<Text fz="lg" fw="550" style={{color:"#1B2B56"}}>
				{username}
			</Text>
			<Space h="sm" />
		</Card>
	);
}
