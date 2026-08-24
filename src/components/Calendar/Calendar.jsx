import { useStore } from "@nanostores/react";
import { toPlainText } from "@portabletext/react";
import {
	add,
	eachDayOfInterval,
	endOfMonth,
	format,
	getDay,
	isEqual,
	isSameDay,
	isSameMonth,
	isToday,
	parse,
	parseISO,
	startOfToday,
} from "date-fns";
import { useState } from "react";
import beaver3 from "../../assets/beavar/Beaver3.svg";
import calendar from "../../assets/icons/calendar.svg";
import chevron from "../../assets/icons/chevron_white.svg";
import location from "../../assets/icons/location.svg";
import { locale, t } from "../../i18n";
import Button from "../Button/Button";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Calendar({ events }) {
	const $locale = useStore(locale);
	const eventList = events ?? [];
	let today = startOfToday();
	let [selectedDay, setSelectedDay] = useState(today);
	let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
	let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
	let calendarMonth = currentMonth.split("-")[0];
	let calendarYear = currentMonth.split("-")[1];

	let displayMonth = selectedDay.toString().slice(4, 7);
	let displayYear = selectedDay.toString().slice(11, 15);
	let displayDay = selectedDay.toString().slice(8, 10);
	const [showUpcomingEvents, setShowUpcomingEvents] = useState(-1);
	let colStartClasses = [
		"",
		"col-start-2",
		"col-start-3",
		"col-start-4",
		"col-start-5",
		"col-start-6",
		"col-start-7",
	];

	let days = eachDayOfInterval({
		start: firstDayCurrentMonth,
		end: endOfMonth(firstDayCurrentMonth),
	});

	function previousMonth() {
		let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
		setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
	}

	function nextMonth() {
		let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
		setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
	}

	let selectedDayEvents = eventList.filter(event => isSameDay(parseISO(event?.start), selectedDay));

	let pastEvents = eventList.filter(event => parseISO(event?.start) < today);
	let upcomingEvents = eventList.filter(event => parseISO(event?.start) >= today);

	let displayedEvents = (() => {
		if (showUpcomingEvents === -1 && pastEvents?.length > 0) {
			return pastEvents;
		}
		if (showUpcomingEvents === 1 && upcomingEvents?.length > 0) {
			return upcomingEvents;
		}
		if (selectedDayEvents?.length > 0) {
			return selectedDayEvents;
		}
		return [];
	})();

	let eventHeading = null;
	if (showUpcomingEvents === -1) {
		eventHeading = t("events.previous");
	} else if (showUpcomingEvents === 1) {
		eventHeading = t("events.upcoming");
	} else if ($locale === "fr") {
		eventHeading = `${displayDay} ${t("events.months")[displayMonth] || displayMonth}, ${displayYear}`;
	} else {
		eventHeading = `${t("events.months")[displayMonth] || displayMonth} ${displayDay}, ${displayYear}`;
	}

	const getToggleClassName = value =>
		`border border-shade-2 px-3 py-1 transition-all duration-200 ${
			showUpcomingEvents === value ? "text-black bg-shade-2" : "text-white"
		}`;

	return (
		<div className="grid grid-cols-5 gap-8 lg:flex lg:flex-col w-full">
			<div
				className="rounded-3xl p-8 md:p-4 bg-blur-svg min-h-[28.5rem] md:min-h-[25rem] w-full col-start-1 col-end-3"
				data-aos="fade-right"
			>
				<div className="flex items-center">
					<h3 className="flex-auto font-semibold">{`${
						t("events.months")[calendarMonth] || calendarMonth
					} ${calendarYear}`}</h3>
					<button
						type="button"
						aria-label={t("accessibility.previous_month")}
						onClick={previousMonth}
						className="p-1.5 mr-4 transition-all duration-200 opacity-75 hover:opacity-100 focus-visible:opacity-100"
					>
						<img src={chevron.src} alt="" aria-hidden="true" className="-scale-x-100" width="8px" />
					</button>
					<button
						onClick={nextMonth}
						type="button"
						aria-label={t("accessibility.next_month")}
						className="p-1.5 transition-all duration-200 opacity-75 hover:opacity-100 focus-visible:opacity-100"
					>
						<img src={chevron.src} alt="" aria-hidden="true" width="8px" />
					</button>
				</div>
				<div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center">
					{t("events.weekdayInitials").map((day, i) => (
						<div key={i}>{day}</div>
					))}
				</div>
				<div className="grid grid-cols-7 mt-2 text-sm">
					{days.map((day, dayIdx) => (
						<div
							key={day.toString()}
							className={classNames(dayIdx === 0 && colStartClasses[getDay(day)], "py-1.5")}
						>
							<button
								type="button"
								aria-pressed={isEqual(day, selectedDay)}
								onClick={() => {
									setSelectedDay(day);
									setShowUpcomingEvents(0);
								}}
								className={classNames(
									"transition-all duration-200",
									isEqual(day, selectedDay) && "text-white",
									!isEqual(day, selectedDay) && isToday(day) && "text-white",
									!isEqual(day, selectedDay) &&
										!isToday(day) &&
										isSameMonth(day, firstDayCurrentMonth) &&
										"text-shade-3",
									!isEqual(day, selectedDay) &&
										!isToday(day) &&
										!isSameMonth(day, firstDayCurrentMonth) &&
										"text-white",
									isEqual(day, selectedDay) && isToday(day) && "bg-primary",
									isEqual(day, selectedDay) && !isToday(day) && "bg-shade-9",
									!isEqual(day, selectedDay) && " hover:text-white",
									(isEqual(day, selectedDay) || isToday(day)) && "font-semibold",
									"mx-auto flex h-8 w-8 items-center justify-center rounded-full",
								)}
							>
								<time dateTime={format(day, "yyyy-MM-dd")}>{format(day, "d")}</time>
							</button>

							<div className="w-1 h-1 mx-auto mt-1">
								{eventList.some(event => isSameDay(parseISO(event?.start), day)) && (
									<div className="w-1 h-1 rounded-full bg-white"></div>
								)}
							</div>
						</div>
					))}
				</div>
				<img
					src={beaver3.src}
					alt=""
					aria-hidden="true"
					className="h-24 hidden absolute -top-16 right-0 -scale-x-100 lg:scale-x-100 lg:block"
				/>
			</div>
			<div
				className="rounded-3xl bg-black flex w-full col-start-3 col-end-6 h-[40rem] xl:h-[35rem] scale-100"
				data-aos="fade-left"
			>
				<div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden p-8 md:p-4">
					<div className="flex h-full min-h-0 flex-col gap-8">
						<div className="flex items-center justify-between gap-4 flex-wrap">
							<h3 className="font-semibold">{eventHeading}</h3>
							<div className="flex flex-row justify-center items-center shadow-glow text-sm xs:text-xs">
								<button
									type="button"
									aria-pressed={showUpcomingEvents === -1}
									onClick={() => setShowUpcomingEvents(-1)}
									className={`${getToggleClassName(-1)} border-r-[0.5px] rounded-l-md`}
								>
									{t("events.previous")}
								</button>
								<button
									type="button"
									aria-pressed={showUpcomingEvents === 0}
									onClick={() => setShowUpcomingEvents(0)}
									className={`${getToggleClassName(0)} border-l-[0.5px] border-r-[0.5px]`}
								>
									{t("events.day")}
								</button>
								<button
									type="button"
									aria-pressed={showUpcomingEvents === 1}
									onClick={() => setShowUpcomingEvents(1)}
									className={`${getToggleClassName(1)} border-l-[0.5px] rounded-r-md`}
								>
									{t("events.upcoming")}
								</button>
							</div>
						</div>
						<hr className="border-shade-7" />
						<div className="min-h-0 flex-1 overflow-auto w-full pr-4">
							<ol className="flex flex-col gap-2">
								{displayedEvents.length > 0
									? displayedEvents.map((event, i) => <Event event={event} index={i} key={i} />)
									: t("events.no_events")}
							</ol>
						</div>
					</div>
					<img
						src={beaver3.src}
						alt=""
						aria-hidden="true"
						className="block h-24 absolute -top-16 right-0 lg:hidden"
					/>
				</div>
			</div>
		</div>
	);
}

function Event({ event, index }) {
	const $locale = useStore(locale);
	let start = parseISO(event?.start);
	let end = parseISO(event?.end);

	let displayDay = start.toString().slice(8, 10);
	let displayMonth = start.toString().slice(4, 7);
	let displayYear = start.toString().slice(11, 15);
	let eventDate = `${t("events.months")[displayMonth] || displayMonth} ${displayDay}, ${displayYear}`;
	if ($locale === "fr") {
		eventDate = `${displayDay} ${t("events.months")[displayMonth] || displayMonth}, ${displayYear}`;
	}

	return (
		<li
			className={`flex items-center px-4 py-4 space-x-4 group rounded-xl border ${
				index % 2 === 0 ? "bg-black" : "bg-blur-svg"
			}`}
		>
			<div className="flex flex-col gap-4 w-full">
				<h4 className="font-semibold">{event?.title?.[`${$locale}`]}</h4>
				<p className="text-sm italic mb-4 items-center flex flex-row flex-wrap">
					<span>{eventDate}</span>
					<img
						src={calendar.src}
						alt=""
						aria-hidden="true"
						className="h-4 w-4 mx-3 inline-block not-italic"
					/>
					<time dateTime={event?.start}>{format(start, "h:mm a").toLowerCase()}</time> -{" "}
					<time dateTime={event?.end}>{format(end, "h:mm a").toLowerCase()}</time>
					<img
						src={location.src}
						alt=""
						aria-hidden="true"
						className="h-4 w-4 mx-2 inline-block not-italic"
					/>
					<span className="not-italic">{event?.location}</span>
				</p>
				<p className="text-sm">{toPlainText(event?.details?.[`${$locale}`])}</p>

				<div className="flex justify-end mt-4 ">
					<Button disabled={event?.disabled} href={event?.link} fill={true}>
						{event?.link_text?.[`${$locale}`]}
					</Button>
				</div>
			</div>
		</li>
	);
}
