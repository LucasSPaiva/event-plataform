import { DefaultUi, Player, Youtube } from '@vime/react'
import { DiscordLogo, YoutubeLogo } from 'phosphor-react'

import '@vime/core/themes/default.css'
import { useGetLessonBySlugQuery } from '../graphql/generated'

interface VideoProps {
	lessonSlug: string
}

export function Video(props: VideoProps) {
	const { data } = useGetLessonBySlugQuery({
		variables: {
			slug: props.lessonSlug
		}
	})

	// Fazer uma estilização de quando está carregando o data
	if (!data || !data.lesson) {
		return (
			<div className="flex-1">
				<p>Carregando...</p>
			</div>
		)
	}

	return (
		<div className="flex-1 scrollbar">
			<div className="bg-black flex justify-center">
				<div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
					<Player>
						<Youtube videoId={data.lesson.videoId} />
						<DefaultUi />
					</Player>
				</div>
			</div>

			<div className="p-8 max-w-[1100px] mx-auto">
				<div className="flex items-start gap-16">
					<div className="flex-1">
						<h1 className="text-2xl font-bold">{data.lesson.title}</h1>
						<p className="mt-4 text-gray-200 leading-relaxed">
							{data.lesson.description}
						</p>
						{data.lesson.teacher && (
							<div className="flex items-center gap-4 mt-6">
								<img
									className="h-16 w-16 rounded-full border-2 border-blue-500"
									src={data.lesson.teacher.avatarURL}
								/>
								<div className="leading-relaxed">
									<strong className="font-bold text-2xl block">
										{data.lesson.teacher.name}
									</strong>
									<span className="text-gray-200 text-sm block">
										{data.lesson.teacher.bio}
									</span>
								</div>
							</div>
						)}
					</div>

					<div className="flex flex-col gap-4">
						<a
							target="_blank"
							href="https://discord.gg/XYaeEpW8rc"
							className="p-4 text-sm bg-indigo-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-indigo-700 transition-colors"
						>
							<DiscordLogo size={24} />
							Comunidade do Discord
						</a>
						<a
							target="_blank"
							href={`https://www.youtube.com/watch?v=${data.lesson.videoId}`}
							className="p-4 text-sm border border-red-600 bg-red-600 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-red-700 hover:border-red-700 transition-colors"
						>
							<YoutubeLogo size={24} />
							Veja no Youtube
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}
