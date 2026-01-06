import { useEffect, useRef, useState } from "react";
import { client, COLLECTION_NAME, DATABASE_ID, RealTimeResponse, tableDatabases } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { Habit } from "@/lib/types/habits";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Query } from "react-native-appwrite";
import { Button, Surface } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";

export default function Index() {
  const {signOut, user} = useAuth();
  const [habits, setHabits] = useState<Array<Habit>>([]);
  const swipeableRefs = useRef<{[key: string]: Swipeable | null}>({});

  const fetchHabits = async () => {
    try {
      const response = await tableDatabases.listRows(
        DATABASE_ID || "",
        COLLECTION_NAME || "",
        [Query.equal("userId", user?.$id ?? "")]
      )
      setHabits(response.rows as unknown as Array<Habit>);
    } catch (error) {
      console.log('Error', error)
    }
  }

  useEffect(() => {
    if(user){
    const channel = `databases.${DATABASE_ID}.tables.${COLLECTION_NAME}.rows`;

    console.log('Channel', channel)

    const habitsSubscription = client.subscribe(
      channel,
      (response: RealTimeResponse) => {
        console.log('Respons is', response)
        if(response.events.includes("database.*.collections.*.documents.*.create")){
          fetchHabits();
        } else if(response.events.includes("database.*.collections.*.documents.*.update")){
          fetchHabits();
        } else if(response.events.includes("database.*.collections.*.documents.*.delete")){
          fetchHabits();
        }
      }
    );

    fetchHabits();

    return () => {
      habitsSubscription()
    }
    }
  }, [user])

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Today's Habits</Text>
        <Button onPress={signOut}>
          <MaterialCommunityIcons name="logout" />
          Sign Out
        </Button>
      </View>
        {habits?.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No Habits Yet. Add your first Habit!</Text>
          </View>
        ) : (
          habits.map((habit, key) => (
        <Swipeable ref={(ref) => {
          swipeableRefs.current[habit.$id] = ref;
        }} key={key}
        overshootLeft={false}
        overshootRight={false}
        >
          <Surface style={styles.card} elevation={0}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{habit.title}</Text>
              <Text style={styles.cardDescription}>{habit.description}</Text>
              <View style={styles.cardFooter}>
                <View style={styles.streakBadge}>
                  <MaterialCommunityIcons
                   name="fire"
                   size={18}
                   color="#ff9800"
                  />
                  <Text style={styles.streakText}>{habit.streak_count} day streak</Text>
                </View>
               <View style={styles.frequencyBadge}>
                  <Text style={styles.frequencyBadgeText}>{habit.frequency}</Text>
                </View>
              </View>
            </View>
          </Surface>
        </Swipeable>
          ))
        )
        }
    </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
  card: {
    marginBottom: 18,
    borderRadius: 18,
    backgroundColor: "#f7f7fa",
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    padding: 10,
    marginInline: 10,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    color: '#22223b',
  },
  cardDescription: {
    fontSize: 15,
    marginBottom: 16,
    color: '#6c6c80',
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff3e0",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  streakText: {
    marginLeft: 6,
    color: "#ff9800",
    fontWeight: "bold",
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    color: "#666666",
    fontWeight: "bold",
    fontSize: 14,
  },
  frequencyBadge: {
    backgroundColor: "#ede7f6",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  frequencyBadgeText: {
    color: "#7c4dfff",
    fontWeight: "bold",
    fontSize: 14,
    textTransform: "capitalize",
  }
})