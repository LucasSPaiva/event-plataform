import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom'
import classNames from 'classnames'

interface LessonProps {
	title: string
	slug: string
	availableAt: Date
	type: 'live' | 'class'
}

export function Lesson(props: LessonProps) {
	const { slug } = useParams<{ slug: string }>()

	const availableDateFormatted = format(
		props.availableAt,
		"d' de 'MMMM' • 'yyyy'",
		{
			locale: ptBR
		}
	)

	const isActiveLesson = slug === props.slug
	return (
		<Link to={`/event/lesson/${props.slug}`} className="group relative">
			<div
				className={classNames(
					'rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 ',
					{
						'bg-green-500  before:content-[""] before:absolute before:top-2/4 before:-left-[5.5px] before:bg-green-500 before:w-[13.75px] before:h-[13.75px] before:rounded-sm before:rotate-45 before:translate-y-[calc(50%-13.75px)]':
							isActiveLesson
					}
				)}
			>
				<strong
					className={classNames(' mb-5 block ', {
						'text-white': isActiveLesson,
						'text-gray-200': !isActiveLesson
					})}
				>
					{props.title}
				</strong>

				<header className="flex items-center justify-between ">
					<span
						className={classNames(
							'text-xs rounded py-[0.125rem] px-2 text-white border  font-bold ',
							{
								'border-white': isActiveLesson,
								'border-green-300': !isActiveLesson
							}
						)}
					>
						{props.type == 'live' ? 'Code Hints' : 'Hand in Code'}
					</span>
					<span
						className={classNames('text-xs', {
							'text-white': isActiveLesson,
							'text-gray-300': !isActiveLesson
						})}
					>
						{availableDateFormatted}
					</span>
				</header>
			</div>
		</Link>
	)
}
