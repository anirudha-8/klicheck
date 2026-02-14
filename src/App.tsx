import { Button } from "@/components/ui/button";
import { Command, CommandInput } from "@/components/ui/command";
import "./App.css";

function App() {
	return (
		<div className="p-2">
			<h1 className="text-3xl font-extrabold">
				klicheck - An Advanced Weather Forecast Application
			</h1>
			<div className="flex gap-2 mt-2">
				<Command className="max-w-sm rounded-lg border">
					<CommandInput placeholder="Type a city to know weather..." />
				</Command>
				<Button variant={"destructive"}>Check</Button>
			</div>
		</div>
	);
}

export default App;
