import { observer } from "mobx-react-lite";

import { adminStore } from "../../state";
import { formatTimestamp, getLevelColor } from "./adminPanelUtils";

const AdminLogs = observer(function AdminLogs() {
	return (
		<div className="logs-container h-68 overflow-y-auto flex flex-col-reverse bg-black !select-text [&_*]:!select-text">
			<div className="p-3 font-mono text-xs">
				{adminStore.logs.length === 0 ? (
					<div className="text-gray-500 italic">No logs yet...</div>
				) : (
					adminStore.logs.map((log, index) => (
						<div
							key={`${log.timestamp}-${index}`}
							className="whitespace-pre-wrap wrap-break-word mb-1"
						>
							<span className="text-gray-500">
								[{formatTimestamp(log.timestamp)}]
							</span>{" "}
							{log.level && (
								<span className={`${getLevelColor(log.level)} font-bold`}>
									[{log.level.toUpperCase()}]
								</span>
							)}{" "}
							<span className={getLevelColor(log.level)}>{log.message}</span>
						</div>
					))
				)}
			</div>
		</div>
	);
});

export default AdminLogs;
