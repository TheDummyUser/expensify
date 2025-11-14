import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { checkIfLoggedIn } from '../services/auth';
import { ActivityIndicator, View } from 'react-native';

type SessionContextType = {
	session: Session | null;
	loading: boolean;
	refetch: () => void;
};

const SessionContext = createContext<SessionContextType>({
	session: null,
	loading: true,
	refetch: () => {},
});

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState(true);

	const getSession = async () => {
		setLoading(true);
		const { data } = await checkIfLoggedIn();
		if (data?.session) {
			setSession(data.session);
		} else {
			setSession(null);
		}
		setLoading(false);
	};

	useEffect(() => {
		getSession();
	}, []);

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator />
			</View>
		);
	}

	return (
		<SessionContext.Provider value={{ session, loading, refetch: getSession }}>
			{children}
		</SessionContext.Provider>
	);
};
